const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

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
app.use(middleware.tokenExtractor)

// route
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

// error middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app