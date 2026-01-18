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
      setNumber('')
      return;
    }

    const newPerson = {
      name: newName,
      number: number,
    }

    axios.post('http://localhost:3000/persons', newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNumber('')
    })
    .catch(error => {
      console.error('Error adding person:' , error)
      alert('Failed to add person to phonebook')
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