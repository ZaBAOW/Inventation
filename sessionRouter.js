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

router.post('/', jsonParser , (req, res) => {
	const requireFields = ['content'];
    console.log('creating session...');
    let content = req.body.content;
    console.log(content);
    return Session.create({
        content
    })
    .then(session => {
        return res.status(201).json(session.serialize());
    })
    .catch(err => {
        if (err.reason === 'ValidationError') {
			return res.status(err.code).json(err);
		}
		res.status(500).json({code: 500, message: 'Internal server error'});
    })
    
})

router.put('/:id', jsonParser, (req, res) => {
    console.log(req.body.content);
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

module.exports = router;