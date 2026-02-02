const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


// this function gest executed before every single test (as the name suggests --> beforeEach means before each test)
beforeEach(async () => {
    await Blog.deleteMany({}) // empty the test DB
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is whitin the returned ones', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    assert.strictEqual(titles.includes('React patterns'), true)
})

// test if a valid post request can be done --> part 4(b)
test('a valid blog can be added', async () => {
    const newBlog = { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes('React patterns'))
})

after(async () => {
    await mongoose.connection.close()
})

// test if a single blog be fetched
test('a single blog can be fetched', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
})

// test if a single blog can be deleted
test('a single blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const resultBlog = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert(blogsAtStart.length === blogsAtEnd.length + 1)

    const ids = blogsAtEnd.map(blog => blog.id)
    assert(!titles.includes(blogToDelete.id))
})