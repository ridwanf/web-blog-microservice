const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = []

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async(req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content })

  commentsByPostId[req.params.id] = comments

  await fetch('http://localhost:4005/events', { 
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id
      }
    })
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
}
);

app.listen(4001, () => {
  console.log('Listening on 4001');
});