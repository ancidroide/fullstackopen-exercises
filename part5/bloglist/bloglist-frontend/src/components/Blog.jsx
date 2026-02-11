import { useState } from "react"

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(updatedBlog) // funcion passed from App.jsx
  }
  
  const handleDelete = async () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      deleteBlog(blog) // funcion passed from App.jsx
    } 
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisible}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          url: {blog.url}
          <br />
          likes: {blog.likes}
          <button onClick={handleLike}>like</button>
          <br />
          user: {blog.user.name}
        </div>
      )}

      {blog.user && typeof blog.user === 'object' && blog.user.id === user.id && (
        <div>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog