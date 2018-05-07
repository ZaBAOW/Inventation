'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../models/users');
const {authToken} = require('../lib/auth/router');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;
chai.use(chaiHttp);

describe('/api/users', function() {
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const usernameB = 'exampleUserB';
  const passwordB = 'examplePassB';
  const firstNameB = 'ExampleB';
  const lastNameB = 'UserB';

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function(){
    return closeServer();
  });

  beforeEach(function() {});

  afterEach(function() {
    return User.remove({});
  });

  
  describe('POST', function(){
    it('should post a new user to the user list', function(){
      let res;
      const newUser = {
        username: username,
        password: password,
        name: {
          firstName: firstName,
          lastName: lastName
        }
      };

      return User.hashPassword(newUser.password)
        .then( function(expectedPassword) {
          return chai.request(app).post('/users').send(newUser);
        })
        .then(function(res){
          expect(res).to.have.status(201);
          expect(res).to.be.a('object');
          expect(res.body).to.include.keys('username','password','firstName', 'lastName','id');
          expect(res.body.username).to.equal(newUser.username);
        });
    });
  });

  describe('GET', function() {
    it('Should return an empty array initially', function() {
      return chai.request(app).get('/users').then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(0);
      });
    });
    it('Should return an array of users', function() {
      return User.create(
      {
        username,
        password,
        firstName,
        lastName
      },
      {
        username: usernameB,
        password: passwordB,
        firstName: firstNameB,
        lastName: lastNameB
      }
    )
      .then(() => chai.request(app).get('/users'))
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(2);
        console.log(res.body[0]);
        console.log(res.body[1])
      });
    });
  });

  describe('PUT', function() {
    it('Should return a JWT auth key for the user', function() {
      let res;
      const newUser = {
        username: username,
        password: password,
        name: {
          firstName: firstName,
          lastName: lastName
        }
      };

      const loginUser = {
        username: username,
        password: password
      }

      return chai.request(app).post('/users').send(newUser).then(res => {
        return User.put('/users').send(loginUser).then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('authToken');
        });
      });
    });
  });
});