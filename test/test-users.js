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
  const url = 'http://example.com';

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
        },
        url: url
      };

      return User.hashPassword(newUser.password)
        .then( function(expectedPassword) {
          return chai.request(app).post('/users').send(newUser);
        })
        .then(function(res){
          expect(res).to.have.status(201);
          expect(res).to.be.a('object');
          expect(res.body).to.include.keys('username','password','firstName', 'lastName','url','id');
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
        lastName,
        url
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
      });
    });
  });

  describe('PUT', function() {
    it('Should return a JWT auth key for the user', function() {
      let res;
      const updatedUrl = 'http://example2.com'
      const newUser = {
        username: username,
        password: password,
        name: {
          firstName: firstName,
          lastName: lastName
        },
        url: url
      };
      return User.hashPassword(newUser.password)
        .then( function(expectedPassword) {
          return chai.request(app).post('/users').send(newUser);
        }).then((res) => {
          chai.request(app).put('/users').then((res) => {
            console.log(res.body);
            expect(res.body).to.be.an('object');
          });
        });

    });
  });
});