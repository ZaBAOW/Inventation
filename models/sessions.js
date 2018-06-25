'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

const sessionSchema = mongoose.Schema({
    content: {type: String, require: true, unique: true}
});

sessionSchema.methods.serialize = function() {
    return {
        content: this.content || ''
    };
};

const Session = mongoose.model('Session', sessionSchema);
module.exports = {Session};
