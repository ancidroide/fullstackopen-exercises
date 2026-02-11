import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // state to store/show success/unsuccess notif
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
}, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      // add user object to browser local storage
      window.localStorage.setItem(
        'loggedBlogsappUser',
        JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')


      setNotification({ message: `${user.name} logged in successfully`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (error) {
      console.error('Login failed:', error);
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')

    setNotification({ message: `${user.name} logged out successfully`, type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    setUser(null)
  }


  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs([...blogs, blog])
      blogFormRef.current.toggleVisibility()

      setNotification({ message: `New blog ${blog.title} by ${blog.author} created successfully`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000);

    } catch (error) {
      console.error('Blog creation failed:', error)
      setNotification({ message: 'Blog creation failed', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const blog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(b => b.id === blog.id ? blog : b))

    } catch (error) {
      console.error('Blog update failed:', error)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.deleteBlog(blogObject.id)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))

      setNotification({ message: `Blog "${blogObject.title}" deleted successfully`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (error) {
      console.error('Faile to delete blog:', error)
      setNotification({ message: 'Failed to delete blog', type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>username
              <input 
                type="text" 
                value={username} 
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>

          <div>
            <label>password
              <input 
                type="password" 
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>

          <button type='submit'>login</button>
        </form>
      </div>
    )
}

  return (
    <div>
      {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={updateBlog}
          user={user}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App