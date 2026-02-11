import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('calls createBlog with correct details when form is submitted', async () => {
    
    // 1. create mock fn and render BlogForm component
    const createBlog = vi.fn()
    render (<BlogForm createBlog={createBlog} />)

    // 2. get input forms
    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    // 3. type into input forms
    await userEvent.type(titleInput, 'Test Title')
    await userEvent.type(authorInput, 'Test Author')
    await userEvent.type(urlInput, 'http://test.com')

    // 4. get and click submit btn
    const submitButton = screen.getByText('create')
    await userEvent.click(submitButton)

    // 5. verify createBlock has been called with correct data
    expect(createBlog).toHaveBeenCalledWith({
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://test.com'
    })
})