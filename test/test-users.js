'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../models/users');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config')

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('/api/users', function() {
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

  

  it('should post a new user to the user list', function(){
    let res;
    const newUser = {
      username: 'testUser',
      password: 'testPassword',
      name: {
        firstName: 'Test',
        lastName: 'Name'
      }
    };

    return chai.request(app).post('/users').send(newUser).then(function(req, res){
      expect(res).to.have.status(201);
      expect(res).to.be.a('object');
      expect(res.body).to.include.keys('username','password','name','id');
      expect(res.body.username).to.equal(newUser.username);
      expect(res.body.password).to.equal(newUser.password);
      console.log(res.body.name);
      return User.findById(res.body.id);
    });
  });
});