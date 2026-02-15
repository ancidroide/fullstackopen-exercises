import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    
    const dispatch = useDispatch()
    const handleVote = id => {
        dispatch(vote(id))
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(setNotification(`you voted for ${anecdote.content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
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