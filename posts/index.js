const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();

const posts ={};
app.use(bodyParser.json());
app.use(cors())
app.get('/posts', (req, res) => {
  res.send(posts);
})

app.post('/posts', async(req,res) => {
  const id = randomBytes(4).toString('hex');
  const {title} = req.body;
  
  posts[id] = {
    id, title
  };
  await fetch('http://localhost:4005/events', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        type: 'PostCreated',
        data: {
          id, 
          title,
        }
    })
  }); 

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
}
);

app.listen(4000, () => {
  console.log('Listening on 4000');
});