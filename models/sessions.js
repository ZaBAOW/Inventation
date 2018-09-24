'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    User
} = require('./users');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const sessionSchema = new Schema({
    infoBoxContent: {
        type: String,
        unique: true
    },
    slideShowContent: {
        type: Array,
        unique: true,
        default: []
    },
    countDownContent: {
        type: String,
        unique: true
    },
    selectedDateContent: {
        type: String,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


sessionSchema.virtual('categoryId').get(function () {
    return this._id;
});

sessionSchema.methods.serialize = function () {
    return {
        infoBoxContent: this.infoBoxContent || '',
        slideShowContent: this.slideShowContent || '',
        countDownContent: this.countDownContent || '',
        selectedDateContent: this.selectedDateContent || '',
        userId: this.userId,
        id: this._id
    };
};

const Session = mongoose.model('Session', sessionSchema);
module.exports = {
    Session
};
