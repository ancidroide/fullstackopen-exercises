const blogsRouter  = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// get all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

// create new blog
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.userId)

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

// get a single blog
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

// delete a single blog
blogsRouter.delete('/:id', async (request, response) => {
    const deleted = await Blog.findByIdAndDelete(request.params.id)
    if (deleted) {
        response.status(204).end()
    }
})

// update specific blog (PUT request)
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    }
})


module.exports = blogsRouter