import React, { useState } from 'react'

const CommentCreate = ({postId}) => {
  const [content, setContent] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:4001/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content})
    })
    setContent('')
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>New Comment</label>
          <input 
            value={content}
            type="text" className="form-control" 
            onChange={e => setContent(e.target.value)} />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate
