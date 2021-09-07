const { Schema, model } = require('mongoose');
const { validateEmail } = require('../utils/common');

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        minLength: 5
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        require: true,
    },
}, {timestamps: true});

module.exports = model('User', userSchema);