'use strict';

const dotenv = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
mongoose.Promise = global.Promise;



const {DATABASE_URL, PORT, SESSION_SECRET, SESSION} = require('./config');
const {USERS} = require('./models/users');
const {SESSIONS} = require('./models/sessions');
const usersRouter = require('./usersRouter');
const {router: authRouter, localStrategy, jwtStrategy} = require('./lib/auth');

const app = express();
const jsonParser = bodyParser.json;

app.set('trust proxy', 1);
app.use(cookieSession(SESSION));

app.use(express.static('public'));

app.use('/users', usersRouter);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
})

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRouter);


app.get('/', function (req, res, next) {
  req.session.views = (req.session.views || 0) + 1;
  res.end(req.session.views + ' views');
});


const jwtAuth = passport.authenticate('jwt', {session: false})

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

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
    console.log('something failed');
  }
  else {
    next(err);
  }
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {runServer, app, closeServer};