const { Schema, model } = require('mongoose');
const { validatePhoneNumber } = require('../utils/common');
const { ObjectId } = Schema.Types;

const orderItemSchema = new Schema({
    orderId: {
        type: ObjectId,
        required: true,
    },
    productName: {
        type: String,
        require: true,
        minLength: 5
    },
    avatar: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    },
    phone: {
        type: Number,
        required: 'Phone is required',
    },
    address: {
        type: String,
        required: 'Address is required',
        minLength: 10
    },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('OrderItem', orderItemSchema);