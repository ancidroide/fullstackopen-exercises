import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created the anecdote ${content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
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