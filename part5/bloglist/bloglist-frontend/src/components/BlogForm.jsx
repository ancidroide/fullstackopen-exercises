import { useState } from "react"

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        props.createBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>title:
                        <input 
                            type='text' 
                            name='title' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>author:
                        <input 
                            type="text" 
                            name="author" 
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>url:
                        <input 
                            type="text" 
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </label>
                </div>

                    <button type="submit">create</button>
            </form>
        </div>
    )
}


export default BlogForm