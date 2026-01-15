import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault() 
    
    if (persons.some(person => person.name == newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
      return;
    }

    // create react ID for the new person
    const personId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1;
    const newPerson = {
      name: newName,
      id: personId
    }
    
    // add the newName to the PHONEBOOK (persons obj)
    setPersons([
      ...persons,
      newPerson
    ])

    // reset the newName input field
    setNewName('')
  } 

  const handleInput = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(person => 
        <div key={person.id}>{person.name}</div>
        )}
    </div>
  )
}

export default App