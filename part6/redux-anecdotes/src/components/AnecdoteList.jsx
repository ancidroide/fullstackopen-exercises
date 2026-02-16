import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimer } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleVote = id => {
        dispatch(voteAnecdote(id))
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(setNotificationWithTimer(
          `you voted for ${anecdote.content}`, 5))
    }



    const orderedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    const filterAndOrderedAnecdotes = orderedAnecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    return (
    <div>
      {filterAndOrderedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
    )
}

export default AnecdoteList