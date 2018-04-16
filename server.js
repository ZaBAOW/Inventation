'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



const {DATABASE_URL, PORT} = require('./config');
const {USERS} = require('./models/users');

const app = express();
const jsonParser = bodyParser.json;

app.use(express.static('public'));

app.get('/users', (req, res) =>{
   res.json(UserProfile.get());
})

app.post('/users', jsonParser , (req, res) =>{
  const requiredFields = ['username', 'password']
  for (let i=0; i<requiredFields.length; i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  
  const user = UserProfile.create(req.body.username, req.body.password);
  res.status(201).json(user);
})

app.delete('/users/:id', (req, res) =>{
  UserProfile.delete(req.params.id);
  res.status(204).end();
})

app.put('/users/:id', jsonParser, (req, res)=> {
  const requiredFields = ['username', 'password', 'id'];
  for (let i = 0; i<requiredFields.length; i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message =  `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if(req.params.id !== req.body.id){
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    consle.error(message);
    return res.status(400).send(message);
  }
  
  UserProfile.update({
    id: req.params.id,
    username: req.body.username,
    password: req.body.password
  });
  res.status(204).end();
})

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {runServer, app, closeServer};