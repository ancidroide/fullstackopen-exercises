const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(morgan('tiny'));
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


// GET .json --> Exercise 3.1 (phonebook backend step 1)
app.get('/api/persons', (request, response) => {
  response.json(persons)
})


// GET info --> Exercise 3.2 (phonebook backend step 2)
app.get('/info', (request, response) => {
  const arrLenght = persons.length
  const time = new Date()

  const htmlResponse = `
  <div>
    <p>Phonebook has info for ${arrLenght} ${arrLenght === 1 ? 'person' : 'people'}</p>
    <p>${time.toString()}</p>
  </div>
  `
  response.send(htmlResponse)
})


// GET single person --> Exercise 3.3 (phonebook backend step 3) url = http://localhost:3001/api/persons/5
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  person ? response.json(person) : response.status(404).json({ error: 'person not found'} )
}) 

// DELETE single person -->  Exercise 3.4 (phonebook backend step 4) url = http://localhost:3001/api/persons/5
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons.filter(person => person.id != id)
  response.status(204).end()
})

 
// POST new pewrson -->  Exercise 3.5 (phonebook backend step 5) url = http://localhost:3001/api/persons/
app.post('/api/persons', (request, response) => {

  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  if (persons.some(person => person.name === name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const newPersonId = Math.random().toString(36).substring(2, 9)
  const newPerson =  {
    id: newPersonId,
    name: name,
    number: number,
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
