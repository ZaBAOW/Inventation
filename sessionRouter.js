'use strict';
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false});

const {Session} = require('./models/sessions');
const {authToken} = require('./lib/auth/router');

router.post('/protected', jwtAuth, jsonParser , (req, res) => {
    console.log('creating session...');
    let content = req.body.content;
    let userId = req.user.id;
    let ObjectId = mongoose.Types.ObjectId;
    let userSession = new ObjectId(userId);
    
    Session.findOne({userId: userId}).exec()
    .then(function(session) {
        console.log('checking for existing session...');
        if(session === null){
            return Session.create({
                content,
                userId,
                unique: true
            })
            .then(session => {
                console.log('created session');
                return res.status(201).json(session.serialize());
            })
            .catch(err => {
                if (err.reason === 'ValidationError') {
                    return res.status(err.code).json(err);
                }
                res.status(500).json({code: 500, message: err});
            })
        } else {
            return res.status(409).json({message: 'You have already created a session'});
        }

    });
});

router.put('/:id', jsonParser, (req, res) => {
    const updateData = req.body.content;
    console.log('saving session...');
    const requireFields = ['content'];
    const conditions = {_id: req.params.id};
    const updateArguments = {content: updateData};
    const options = {new: true};
    return Session.findOneAndUpdate(conditions, updateArguments, options)
        .exec()
        .then(function(data) {
            return res.status(204).end();
        })
})

router.get('/', (req, res) => {
    return Session.find()
    .then(function(session) {
        console.log('sessions retrieved');
        return res.status(200).send(session).end();
    })
    .catch(function(err) {
        console.log(err);
    });
})

router.get('/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    return Session.findById(id).exec()
    .then(function(session) {
        return res.status(200).json({data: session});
    })
    .catch(function(error){
        console.log(error);
    })
})

module.exports = router;