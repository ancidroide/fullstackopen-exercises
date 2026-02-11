import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'title test',
    author: 'author test',
    url: 'http://test.com',
    likes: 0,
    user: {
      id: '123',
      name: 'Test User'
    }
  }

  const user = {
    id: '123',
    name: 'Test User'
  }

  render(<Blog blog={blog} updateBlog={() => {}} user={user} deleteBlog={() => {}} />)
  
  // Exercise 5.13 (verify title and author IN the document && url and likes NOT in the document)
  const titleElement = screen.getByText((content) => content.includes('title test'))
  expect(titleElement).toBeInTheDocument()

  const authorElement = screen.getByText((content) => content.includes('author test'))
  expect(authorElement).toBeInTheDocument()

  const urlElement = screen.queryByText('http://test.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('likes:')
  expect(likesElement).toBeNull()
})

// 5.15 (verify button view shows url && likes)
test('shows URL and likes when view button clicked', async () => {
  const blog = {
    title: 'title test',
    author: 'author test',
    url: 'http://test.com',
    likes: 0,
    user: {
      id: '123',
      name: 'Test User'
    }
  }

  const user = {
    id: '123',
    name: 'Test User'
  }
  render(<Blog blog={blog} updateBlog={() => {}} user={user} deleteBlog={() => {}} />)

  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton)

  
  const urlElement = screen.getByText((content) => content.includes('http://test.com'))
  expect(urlElement).toBeInTheDocument()

  const likesElement = screen.getByText((content) => content.includes('likes:'))
  expect(likesElement).toBeInTheDocument()
})