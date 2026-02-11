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
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // Keep user as object if populated, otherwise convert to string
        if (returnedObject.user && typeof returnedObject.user === 'object' && returnedObject.user._id) {
            // User is populated - keep it as an object, just convert the _id to id
            if (returnedObject.user._id) {
                returnedObject.user.id = returnedObject.user._id.toString()
                delete returnedObject.user._id
                delete returnedObject.user.__v
            }
        }
    }
})

module.exports = mongoose.model('Blog', blogSchema)