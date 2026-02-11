import { render, screen } from '@testing-library/react'
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
  
  const titleElement = screen.getByText((content) => content.includes('title test'))
  expect(titleElement).toBeInTheDocument()

  const authorElement = screen.getByText((content) => content.includes('author test'))
  expect(authorElement).toBeInTheDocument()

  const urlElement = screen.queryByText('http://test.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('likes:')
  expect(likesElement).toBeNull()

})
