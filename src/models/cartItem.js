const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        require: true,
    },
    cartId: {
        type: ObjectId,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    amount: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model('CartItem', cartItemSchema);