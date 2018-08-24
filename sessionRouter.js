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
    console.log(req.body);
    let infoBoxContent = req.body.content.infoBoxContent;
    let slideShowContent = req.body.content.slideShowContent;
    let countDownContent = req.body.content.countDownContent;
    console.log(infoBoxContent);
    console.log(slideShowContent);
    console.log(countDownContent);
    let userId = req.user.id;
    let ObjectId = mongoose.Types.ObjectId;
    let userSession = new ObjectId(userId);
    Session.findOne({userId: userId}).exec()
    .then(function(session) {
        console.log('checking for existing session...');
        if(session === null){
            return Session.create({
                infoBoxContent,
                slideShowContent,
                countDownContent,
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
    console.log("checking parameters: " ,  req.params);
    console.log("REQ BODY: " , req.body);
    console.log('saving session...');
    const requireFields = ['content'];
    let ObjectId = mongoose.Types.ObjectId;
    let sessionId = new ObjectId(req.params.id);
    const conditions = {_id: sessionId};
    console.log("Conditions: " , conditions)
    const infoBoxContent = updateData.infoBoxContent;
    const slideShowContent = updateData.slideShowContent;
    const countDownContent = updateData.countDownContent;
    const updateArguments = {infoBoxContent, slideShowContent, countDownContent};
    console.log("Update Arguments" , updateArguments);
    const options = {new: true};
    return Session.findOneAndUpdate(conditions, updateArguments, options)
        .exec()
        .then(function(data) {
            console.log("Data:" , data);
            return res.status(204).end();
        })
        .catch(function(err) {
            return res.status(500).json({message: err});
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
        return res.status(400).json({message: "no session found"});
    })
})

module.exports = router;