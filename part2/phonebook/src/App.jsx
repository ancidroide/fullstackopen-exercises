import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
// import axios from 'axios'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')


  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault() 
    
    if (persons.some(person => person.name == newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNumber('')
      return;
    }

    const newPerson = {
      name: newName,
      number: number,
    }

    personsService
    .create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNumber('')
    })
    .catch(error => {
      console.error('Error adding persons:', error)
      alert('Failed to add persone to phonebook')
    })
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

  // componente to handle deletePerson
  const handleDeletePerson = (id) => {

    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`))
      personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))  
      })
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

      <PersonsList filteredPersons={filteredPersons} onDeletePerson={handleDeletePerson}/>
    </div>
  )
}


export default App