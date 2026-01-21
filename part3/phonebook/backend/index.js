const express = require('express')
const app = express()
app.use(express.json())

const persons = [
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
  </div
  `
  response.send(htmlResponse)
})


// GET single person --> url = http://localhost:3001/api/persons/5
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  person ? response.json(person) : response.status(404).json({ error: 'person not found'} )
}) 





const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
