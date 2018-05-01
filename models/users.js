'use strict';
const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;


const userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: {
        firstName: String,
        lastName: String
    }
});

userSchema.methods.serialize = function() {
    return {
        username: this.username || '',
        password: this.password || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        id: uuid.v4()
    };
};

userSchema.methods.validatePasword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);
module.exports = {User};
