const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const cartItemSchema = new Schema({
    cartId: {
        type: ObjectId,
        require: true,
    },
    productId: {
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
}, {
    timestamps: true,
    versionKey: false,
});

cartItemSchema.virtual('products', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true,
});

module.exports = model('CartItem', cartItemSchema);