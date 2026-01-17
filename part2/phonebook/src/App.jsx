import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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

  // component to handle search
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <SearchFilter handler={handleSearch} value={search} />

      <h2>add a new</h2>

      <PersonForm 
        handlerSubmit={handleSubmit}
        newName={newName}
        handleInput={handleInput}
        number={number}
        handleInputNumber={handleInputNumber}
      />

      <h2>Numbers</h2>

      <PersonsList filteredPersons={filteredPersons} />
    </div>
  )
}

export default App



