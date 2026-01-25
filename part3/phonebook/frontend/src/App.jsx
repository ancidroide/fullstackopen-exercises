import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
// import axios from 'axios'
import personsService from './services/persons.js'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number 
        with a new one?`)) {
          const existingPerson = persons.find(person => person.name === newName)
          const id = existingPerson.id

          const updatedPerson = {
            name: newName,
            number: number
          }

          personsService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id === returnedPerson.id ? returnedPerson : person ))
          
            setSuccesMessage(`Updated ${returnedPerson.name}'s number`)
            setTimeout(() => {
              setSuccesMessage(null)
            }, 5000);
          })

          .catch(() => {
            setErrorMessage(`Information of ${newName} has already been removed from the server`);
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })
          

        } else {
            setNewName('')
            setNumber('')
            return;
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: number,
      }

      personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccesMessage(`Added ${newName}`)
        
        setTimeout(() => {
          setSuccesMessage(null);
          }, 5000)
        
        setNewName('')
        setNumber('')
      })

      .catch(error => {
        console.error('Error adding persons:', error)
        alert('Failed to add persone to phonebook')
      })
    }}
      
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

  // component to handle deletePerson
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

      {succesMessage && <div className='success'>{succesMessage}</div>}
      {errorMessage && <div className='error'>{errorMessage}</div>}

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