import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],

  reducers: {
    vote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload ? 
        {...anecdote, votes: anecdote.votes + 1} : anecdote)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

const { setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const inizializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes
    const anecdoteToVote = anecdote.find(anecdote => anecdote.id === id)
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1}

    const votedAnecdote = await anecdoteService.vote(updatedAnecdote)
    dispatch(vote(votedAnecdote.id))

  }
}
export const { vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
