const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => 
    blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
}

const mostBlogs = (blogs) => {
    const counts = _.countBy(blogs, 'author')
    const authorCounts = _.map(counts, (val, key) => {
        return {
            author: key,
            blogs: val,
        }
    })

    return _.maxBy(authorCounts, 'blogs') 
    
    
}

const mostLikes = (blogs) => {
    const counts = _.groupBy(blogs, 'author')
    const likesCount = _.map(counts, (val, key) => {
        return {
            author: key,
            likes: totalLikes(val)
        }
    })
    return _.maxBy(likesCount, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
