import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

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
    } catch (error) {
      console.error('Login failed:', error);  
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
  }

  const handleNewBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addBlog = async event => {
    event.preventDefault()
    
    try {
      const blog = await blogService.create(newBlog)
      setBlogs([...blogs, blog])
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })

    } catch (error) {
      console.error('Blog creation failed:', error)
    }
  }
  if (user === null) {
    return (
      <div>
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
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        
        <div>
          <label>title:
            <input 
              type="text" 
              name='title'
              value={newBlog.title}
              onChange={handleNewBlogChange}
          />
          </label>
        </div>

        <div>
          <label>author:
            <input 
              type='text'
              name='author'
              value={newBlog.author}
              onChange={handleNewBlogChange} 
          />
          </label>
        </div>

        <div>
          <label>url:
            <input 
              type="text"
              name='url'
              value={newBlog.url}
              onChange={handleNewBlogChange}
            />
          </label>
        </div>

        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App