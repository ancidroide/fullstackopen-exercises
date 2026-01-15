import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault() 
    
    if (persons.some(person => person.name == newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
      return;
    }

    // create react ID for the new person
    const personId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1;
    const newNumber = number
    const newPerson = {
      name: newName,
      id: personId,
      number: newNumber
    }
    
    // add the newName to the PHONEBOOK (persons obj)
    setPersons([
      ...persons,
      newPerson
    ])

    // reset the newName input field
    setNewName('')
    setNumber('')
  } 

  // component to handle name input
  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  // component to handle number 
  const handleInputNumber = (event) => {
    setNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          number: <input value={number} onChange={handleInputNumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(person => 
        <div key={person.id}>{person.name} {person.number}</div>
        )}
    </div>
  )
}

export default App