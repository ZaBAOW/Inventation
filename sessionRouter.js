'use strict';
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {
    session: false
});

const {
    Session
} = require('./models/sessions');
const {
    authToken
} = require('./lib/auth/router');

router.post('/', jwtAuth, jsonParser, (req, res) => {
    console.log('creating session...');
    console.log(req.body);
    let infoBoxContent = req.body.content.infoBoxContent;
    let slideShowContent = req.body.content.slideShowContent;
    let countDownContent = req.body.content.countDownContent;
    let selectedDateContent = req.body.content.selectedDateContent;
    console.log(infoBoxContent);
    console.log(slideShowContent);
    console.log(countDownContent);
    let userId = req.user.id;
    console.log("user id: ", userId);
    let ObjectId = mongoose.Types.ObjectId;
    let userSession = new ObjectId(userId);
    Session.findOne({
            userId: userId
        }).exec()
        .then(function (session) {
            console.log('checking for existing session...');
            console.log("new session: ", session);
            if (session == "null" || session == null || session == "") {
                return Session.create({
                        infoBoxContent,
                        slideShowContent,
                        countDownContent,
                        selectedDateContent,
                        userId,
                        unique: false
                    })
                    .then(session => {
                        console.log('created session');
                        console.log("session id: ", session);
                        return res.status(201).json(session.serialize());
                    })
                    .catch(err => {
                        console.log(err);
                        if (err.reason === 'ValidationError') {
                            return res.status(err.code).json(err);
                        }
                        res.status(500).json({
                            code: 500,
                            message: err
                        });
                    })
            } else {
                return res.status(409).json({
                    message: 'You have already created a session',
                    code: 409
                });
            }

        });
});

router.put('/:id', jsonParser, (req, res) => {
    const updateData = req.body.content;
    console.log("checking parameters: ", req.params);
    console.log("REQ BODY: ", req.body);
    console.log('saving session...');
    const requireFields = ['content'];
    let ObjectId = mongoose.Types.ObjectId;
    let sessionId = new ObjectId(req.params.id);
    const conditions = {
        _id: sessionId
    };
    const infoBoxContent = updateData.infoBoxContent;
    const slideShowContent = {
        image: updateData.slideShowContent
    };
    const countDownContent = updateData.countDownContent;
    const selectedDateContent = updateData.selectedDateContent;
    const updateArguments = {
        infoBoxContent,
        countDownContent,
        selectedDateContent
    };
    console.log("Update Arguments", updateArguments);
    const options = {
        new: true
    };
    return Session.findOneAndUpdate(conditions, updateArguments, options)
        .exec()
        .then(function (session) {
            if (slideShowContent.image == null) {
                console.log('there was no image to add');
                return res.status(204).end();
            } else {
                console.log('adding image...');
                return Session.update(conditions, {
                        $push: {
                            slideShowContent
                        }
                    })
                    .then(function (session) {
                        console.log('displaying updated session');
                        //  console.log("New Session: ", session);
                        return res.status(204).end();
                    })
                    .catch(function (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: err
                        });
                    });
            }
        })
        .catch(function (err) {
            return res.status(500).json({
                message: err
            });
        })

})

router.get('/', (req, res) => {
    return Session.find()
        .then(function (session) {
            console.log('sessions retrieved');
            return res.status(200).send(session).end();
        })
        .catch(function (err) {
            console.log(err);
        });
})

router.get('/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    return Session.findOne({userId: id}).exec()
        .then(function (session) {
            console.log(session);
            return res.status(200).json({
                data: session,
                message: "session found"
            });
        })
        .catch(function (error) {
            console.log(error);
            return res.status(400).json({
                message: "no session found"
            });
        })
})

module.exports = router;
