const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const assert = require('node:assert')

const initialBlogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://...', likes: 5 }
]

// this function gest executed before every single test (as the name suggests --> beforeEach means before each test)
beforeEach(async () => {
    await Blog.deleteMany({}) // empty the test DB
    await Blog.insertMany(initialBlogs) // add initial blogs
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog is whitin the returned ones', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(e => e.title)
    assert.strictEqual(titles.includes('React patterns'), true)
})

after(async () => {
    await mongoose.connection.close()
})
