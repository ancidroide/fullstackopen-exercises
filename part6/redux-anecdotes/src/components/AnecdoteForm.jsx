import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimer } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        
        dispatch(appendAnecdote(content))
        dispatch(setNotificationWithTimer(`you created the anecdote ${content}`))
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