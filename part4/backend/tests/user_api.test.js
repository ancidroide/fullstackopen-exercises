const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')


const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user in db', async () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mlukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        
        assert(result.body.error.includes('unique'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'mlukkai',
            name: 'Matti Lukkainen',
            password: 'ab'
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        
        assert(result.body.error.includes('password must be at least 3 characters long'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        
    })

})

after(async () => {
  await mongoose.connection.close()
})
