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

router.post('/', (req, res) => {
	const requireFields = ['content'];
    console.log('creating session...');
    let content = req.body;
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

router.put('/', (req,res) => {
    console.log('saving session...');
    return res.status(204).end();
})

module.exports = router;