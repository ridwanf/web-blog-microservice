const express = require('express');
const bodyParser = require('body-parser');

 const app = express();
 app.use(bodyParser.json());

 app.post('/events', async (req, res) => {
  const event = req.body;
  console.log(event)
  fetch("http://localhost:4000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  
  fetch("http://localhost:4002/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
    4001
  res.send({status: 'OK'});
 });

 app.listen(4005, () => { 
  console.log('Event Bus listening on 4005');
 });