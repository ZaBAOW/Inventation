'use strict';
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false});

const {User} = require('./models/users');
const {authToken} = require('./lib/auth/router');

router.get('/:username', (req, res) =>{
   var username = req.params.username;
   return User.findOne({username: username}).exec()
       .then(function (user){
            console.log('user:', user.id);
            return res.json({
                message: 'found user',
                user: user.id
            })
        })
       .catch(err => {res.status(500).json({message: 'Internal server error'})});
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if(missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    const stringFields = ['username', 'password', 'firstName', 'lastName'];
    const nonStringField = stringFields.find(
        field => field in req.body && typeof req.body[field] !== 'string'
    );

    if (nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringField
        });
    }

    const explicityTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicityTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
    );

    if(nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

    const sizedFields = {
        username: {
            min: 1
        },
        password: {
            min: 10,
            max: 72
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field =>
            'min' in sizedFields[field] &&
                req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
        field =>
            'min' in sizedFields[field] &&
                req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
            : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }

    let {username, password, firstName = '', lastName = ''} = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();

    return User.find({username}).count().then(count => {
        if(count > 0) {
            return Promise.reject({
                code: 422,
                reason: 'ValidationError',
                message: 'Username already taken',
                location: 'username'
            });
        }

        return User.hashPassword(password);
    }).then(hash => {
        return User.create({
            username,
            password: hash,
            firstName,
            lastName
        });
    }).then(user => {
        return res.status(201).json(user.serialize());
    }).catch(err => {
        if (err.reason === 'ValidationError') {
            return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

router.get('/', (req, res) => {
    return User.find()
        .then(users => res.json(users.map(user => user.serialize)))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.put('/:id', jsonParser, (req, res) => {
    const updatedData = req.body.username;
    console.log(updatedData);
    console.log(`Updating site url for ${req.params.id}`);
    const sendSuccess = function(updated){
        console.log(`Updated site url for ${req.params.id}`);
        console.log(updated);
    };
    const conditions = {_id: req.params.id};
    const updateArguments = {$set: {username: updatedData}};
    const options = {new: true};
    return User.update(conditions, updateArguments, options)
        .exec()
        .then(function(queryResults) {
            return res.status(204);
        });

});

router.delete('/:id', (req, res) => {
    const idForRemoval = req.params.id;
    User.findByIdAndRemove(idForRemoval)
    .then(() => {
        console.log(`Deleted blog post with id \`${idForRemoval}\``);
        return res.status(204).end();
    });
})

module.exports = router;
