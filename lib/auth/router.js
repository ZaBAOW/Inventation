'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const config = require('../../config');
const router = express.Router();

passport.serializeUser(function(user, done) {
	done(null, user);
  });

passport.deserializeUser(function(user, done) {
	done(null, user);
});

const createAuthToken = function(user) {
	console.log('created JWT for client');
	return jwt.sign({user}, config.JWT_SECRET, {
		subject: user.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

const localAuth = passport.authenticate('local', {session: true});
router.use(bodyParser.json());
router.post('/login', localAuth, (req, res) => {
	console.log('login function running');
	const authToken = createAuthToken(req.user.serialize());
	console.log(authToken);
	res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/refresh', jwtAuth, (req, res) => {
	const authToken = createAuthToken(req.user);
	res.json({authToken});
	localStorage.setItem('authToken', authToken);
});

router.get('/protected', jwtAuth, (req, res) => {
	return res.json({
		data: 'jwt retrieved'
	});
});

module.exports = {router};