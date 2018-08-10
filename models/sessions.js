'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User} = require('./users');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const sessionSchema = new Schema({
    content: {type: String, required: [true, 'there is not content'], unique: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
});


sessionSchema.virtual('categoryId').get(function() {
    return this._id;
});

sessionSchema.methods.serialize = function() {
    return {
        content: this.content || '',
        userId: this.userId,
        id: this._id
    };
};

// Schema.prototype('find', function(next) {
//     this.populate('userId');
//     next();
// });

const Session = mongoose.model('Session', sessionSchema);
module.exports = {Session};
