import React from 'react'

function CommentList({comments}) {
 
  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>
  });
  return (
    <div>
      {renderedComments}
    </div>
  )
}

export default CommentList