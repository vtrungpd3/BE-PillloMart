const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },
    quantity: {
        type: Number,
        require: true,
    },
    amount: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['cart', 'order'],
        default: 'cart',
    }
}, {timestamps: true});

cartSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Cart', cartSchema);