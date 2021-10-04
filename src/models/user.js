const { Schema, model } = require('mongoose');
const { validateEmail } = require('../utils/common');
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    },
    avatar: {
        type: String,
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
    addressId: {
        type: ObjectId,
    }
}, { timestamps: true, versionKey: false });

userSchema.virtual('address', {
    ref: 'Address',
    localField: 'addressId',
    foreignField: '_id',
    justOne: true,
});

module.exports = model('User', userSchema);