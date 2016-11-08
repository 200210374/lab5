/**
 * Created by Brandon Roy on 07/11/2016.
 */

var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Enter a username'
    },
    password: {
        type: String,
        required: 'Create password'
    }
});

// make the class public
module.exports = mongoose.model('users', usersSchema);