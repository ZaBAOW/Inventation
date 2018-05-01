'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



const {DATABASE_URL, PORT} = require('./config');
const {USERS} = require('./models/users');
const usersRouter = require('./usersRouter');

const app = express();
const jsonParser = bodyParser.json;

app.use(express.static('public'));

app.use('/users', usersRouter);

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