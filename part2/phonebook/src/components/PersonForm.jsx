const PersonForm = ( {handlerSubmit, newName, handleInput, number, handleInputNumber} ) => {
    return (
        <form onSubmit={handlerSubmit}>
            <div>
                name: <input value={newName} onChange={handleInput} />
            </div>

            <div>
                number: <input value={number} onChange={handleInputNumber} />
            </div>
            
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm