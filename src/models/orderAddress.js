const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const orderAddressSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    },
    phone: {
        type: String,
        required: 'Phone is required',
    },
    address: {
        type: String,
        required: 'Address is required',
        minLength: 10
    },
    addressId: {
        type: ObjectId,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('OrderAddress', orderAddressSchema);