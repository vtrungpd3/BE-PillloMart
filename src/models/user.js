const mongoose = require('mongoose');
const { validateEmail } = require('../constants/enum');

const userSchema = new mongoose.Schema({
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

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('User', userSchema);