import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const handleVote = id => dispatch(vote(id))

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

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