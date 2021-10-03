const { Schema, model } = require('mongoose');
const { validatePhoneNumber } = require('../utils/common');
const { ObjectId } = Schema.Types;

const addressSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    },
    phone: {
        type: String,
        required: 'Phone is required',
        validate: [validatePhoneNumber, 'Please fill a valid Phone Number'],
    },
    address: {
        type: String,
        required: 'Address is required',
        minLength: 10
    },
}, { timestamps: true, versionKey: false });

module.exports = model('Address', addressSchema);