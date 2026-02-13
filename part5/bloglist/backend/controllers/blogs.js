const blogsRouter  = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

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
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    console.log('Blog create request:', request.body)
    console.log('User from token:', request.user)
    
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(await savedBlog.populate('user'))
})

 
// 2. delete a single blog (DELETE)
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(401).json({
            error: 'blog not found'
        })
    }
    const user = request.user

    if (blog.user.toString() === user._id.toString()) {
        const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(401).json({
            error: 'authorization missing'
        })
    }
})

// 3. update specific blog (PUT request) (PUT)
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true }).populate('user')

    if (updatedBlog) {
        response.json(updatedBlog)
    }
})




module.exports = blogsRouter