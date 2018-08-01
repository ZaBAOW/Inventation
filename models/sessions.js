'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

const sessionSchema = mongoose.Schema({
    content: {type: String,
        required: [true, 'there is not content'], 
        unique: true
    },
    userId: {type: String}
});

sessionSchema.methods.serialize = function() {
    return {
        content: this.content || '',
        userId: this.userId,
        id: this._id
    };
};

const Session = mongoose.model('Session', sessionSchema);
module.exports = {Session};
