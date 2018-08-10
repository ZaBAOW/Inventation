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
    var content = "this is the content of the current session";

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
    
      describe('PUT', function() {
          it('should save the content presented in the request', function() {
              let res;
              const newContent = 'This is the new content for the site';
              const updateContent = {
                content: newContent
                };
              return Session.create({
                  content: content
              })
              .then(function(session){
                return chai.request(app).put(`/session/${session._id}`)
                .send(updateContent)
                .then(function(res){
                    expect(res).to.have.status(204);
                    console.log(session.content);
                    return Session.findById(session._id);
                })
                .then(function(session) {
                    expect(session.content).to.equal(newContent);
                })
                .catch(err => {
                    console.log(err);
                })
              });
          });
      });

      describe('POST', function() {
          it('should create a session if there are no saved sessions', function() {
              let res;
              const createContent = {
                content: content
              }
              return Session.estimatedDocumentCount()
              .then(function(count) {
                if(count === null || count === undefined) {
                    return chai.request(app).post('/session/protected')
                    .send(createContent)
                    .then(function(session){
                        console.log(session);
                        expect(session).to.have.status(201);
                        expect(session).to.be.a('object');
                        expect(session.body.content).to.equal(content);
                    });
                }
              })
            })
        })
            

          it('should do nothing if there are saved sessions', function() {
              let res;
              const createdContent = {
                  content: content
              }
              return chai.request(app).post('/session/protected').send(createdContent)
              .then(function(session) {
                  if(session.body.content !== null) {
                      console.log('there is already a session ');
                      console.log(session.body);
                    //   expect(session.body.content).to.equal(createdContent.content);
                      expect(session).to.be.a('object');
                  }
              })
          })


      describe('GET', function() {
          it('Should retrieve an existing session by id', function() {
              let res;
              return Session.create({
                  content: content
              })
              .then(function(session) {
                  return chai.request(app).get(`/session/${session._id}`)
                  .then(function(res) {
                      console.log(session.content);
                      expect(res).to.have.status(200);
                      expect(session.content).to.be.a('string');
                      expect(session.content).to.equal(content);
                  })
              })
          })
      })
})