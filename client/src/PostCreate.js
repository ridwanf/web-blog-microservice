import React, { useState } from 'react'

const PostCreate = () => {
  const [title, setTitle] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
    setTitle('')
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default PostCreate