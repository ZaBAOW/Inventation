'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User} = require('./users');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const sessionSchema = new Schema({
    // content: {type: Object, required: [true, 'there is no content'], unique: true,
    //             infoBoxContent: String,
    //             slideShowContent: String,
    //             countDownContent: String},
    infoBoxContent: {type: String, unique: true},
    slideShowContent: {type: String, unique: true},
    countDownContent: {type: String, unique: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
});


sessionSchema.virtual('categoryId').get(function() {
    return this._id;
});

sessionSchema.methods.serialize = function() {
    return {
        infoBoxContent: this.infoBoxContent || '',
        slideShowContent: this.slideShowContent || '',
        countDownContent: this.countDownContent || '',
        userId: this.userId,
        id: this._id
    };
};

const Session = mongoose.model('Session', sessionSchema);
module.exports = {Session};
