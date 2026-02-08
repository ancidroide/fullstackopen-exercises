const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    url: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id  = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // Convert user ObjectId to string if it exists and isn't already a string
        if (returnedObject.user) {
            // Check if user is an object with _id (populated) or just an ObjectId
            if (typeof returnedObject.user === 'object' && returnedObject.user._id) {
                // User is populated, convert the populated user's _id to id
                returnedObject.user = returnedObject.user._id.toString()
            } else if (typeof returnedObject.user !== 'string') {
                // User is not populated, just an ObjectId, convert to string
                returnedObject.user = returnedObject.user.toString()
            }
        }
    }
})

module.exports = mongoose.model('Blog', blogSchema)