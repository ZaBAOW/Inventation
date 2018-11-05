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
        unique: false
    },
    slideShowContent: {
        type: Array,
        unique: false,
        default: []
    },
    countDownContent: {
        type: String,
        unique: false
    },
    selectedDateContent: {
        type: String,
        unique: false
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
