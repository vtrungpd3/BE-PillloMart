const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema({
    name: {
        type: String,
        require: true,
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
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('OrderProduct', orderItemSchema);