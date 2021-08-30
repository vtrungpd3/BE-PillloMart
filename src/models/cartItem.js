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
        ref: 'cart',
    },
    quantity: {
        type: Number,
        require: true,
    },
    amount: {
        type: Number
    }
}, {timestamps: true});

cartItemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema);