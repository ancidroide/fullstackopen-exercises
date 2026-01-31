const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRoutes = require('./controllers/blogs')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = config.MONGODB_URI

logger.info('Connecting to MongoDB')

mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// middleware
app.use(express.static('disdt'))
app.use(express.json())
app.use(middleware.requestLogger)

// route
app.use('/api/blogs', blogsRoutes)

// error middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app