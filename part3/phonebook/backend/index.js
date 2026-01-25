const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())

const morgan = require('morgan')
app.use(express.static('dist'))

// custom morgan token
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :response-time :res[content-length] :body'));


// GET .json --> Exercise 3.1 (phonebook backend step 1)
app.get('/api/persons', (request, response, next) => {
  Person
    .find({}).then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
    })

// GET info --> Exercise 3.2 (phonebook backend step 2)
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const time = new Date()
      const htmlResponse = `
      <div>
        <p>Phonebook has info for ${count} ${count === 1 ? 'person' : 'people'}</p>
        <p>${time.toString()}</p>
      </div>
      `
      response.send(htmlResponse)
    })
    .catch(error => next(error))
  })



// GET single person --> Exercise 3.3 (phonebook backend step 3) url = http://localhost:3001/api/persons/5
app.get('/api/persons/:id', (request, response, next) =>  {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  }
)
// DELETE single person -->  Exercise 3.4 (phonebook backend step 4) url = http://localhost:3001/api/persons/5
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })
 
// POST new person -->  Exercise 3.5 (phonebook backend step 5) url = http://localhost:3001/api/persons/
app.post('/api/persons', (request, response, next) => {

  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: name,
    number: number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// PUT
app.put('/api/persons/:id', (request, response, next) => {
  // const { name, number } = request.body
  // const person = { name, number }

  const person = {
    name: request.body.name,
    number: request.body.number,
  }
  const id = request.params.id

  Person.findByIdAndUpdate(id, person, { new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  
  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
