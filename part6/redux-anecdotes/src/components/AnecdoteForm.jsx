import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(createAnecdote(content))
    }
    
    return (
        <div>
            <form onSubmit={addAnecdote}>
                <input name="newAnecdote"/>
                <button type="submit">new anecdote</button>
            </form>
        </div>
    )
}

export default AnecdoteForm