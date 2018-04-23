'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = globale.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {type: String, default: ''},
	lastName: {type: String, default: ''}
});

UserSchema.methods.serialize = function() {
	return {
		usernam: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || ''
	};
};

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};