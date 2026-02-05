const blogsRouter  = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET REQUESTS

// 1. get all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

// 2. get a single blog
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

// MODIFYING REQUEST

// 1. create new blog (POST)
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    // request.token --> from token extractor MW
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({
            error: 'userId missing or not valid'
        })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

 
// 2. delete a single blog (DELETE)
blogsRouter.delete('/:id', async (request, response) => {
    const deleted = await Blog.findByIdAndDelete(request.params.id)
    if (deleted) {
        response.status(204).end()
    }
})

// 3. update specific blog (PUT request) (PUT)
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    }
})


module.exports = blogsRouter