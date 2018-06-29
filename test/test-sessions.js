'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {Session} = require('../models/sessions');
const {authToken} = require('../lib/auth/router');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;
chai.use(chaiHttp);

describe('/api/session', function() {
    const content = "this is the content of the current session";

    before(function() {
        return runServer(TEST_DATABASE_URL);
      });
    
      after(function(){
        return closeServer();
      });
    
      beforeEach(function() {});
    
      afterEach(function() {
        return Session.remove({});
      });
    
    //   describe('PUT', function() {
    //       it('should save the content presented in the request', function() {
    //           let res;
    //           const updateContent = {
    //               content: content
    //           };
    //           return Session.create({content})
    //           .then(function(res) {
    //               expect(res).to.have.status(204);
    //             //   expect(res).to.be.a('object');
    //             //   expect(res.body).to.include.keys('content');
    //           })
    //       })
    //   })

      describe('POST', function() {
          it('should create a session if there are no saved sessions', function() {
              let res;
              const newContent = {
                  content: content
              }
              return chai.request(app).post('/session').send(newContent)
              .then(function(res){
                  expect(res).to.have.status(201);
                  expect(res).to.be.a('object');
              })
          })

          it('should do nothing if there are saved sessions', function() {
              let res;
          })
      })
})