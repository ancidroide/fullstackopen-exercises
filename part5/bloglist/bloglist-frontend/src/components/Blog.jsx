import { useState } from "react"

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisible}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          url: {blog.url}
          <br />
          likes: {blog.likes}
          <br />
          user: {blog.user.name}
        </div>
      )}
    </div>
  )
}

export default Blog