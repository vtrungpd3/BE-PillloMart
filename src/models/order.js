const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const orderSchema = new Schema({
    userId: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },
    cartItemId: {
        type: [String],
        require: true,
        ref: 'CartItem'
    },
}, {timestamps: true, versionKey: false});

orderSchema.virtual('products', {
    ref: 'CartItem',
    localField: 'cartItemId',
    foreignField: '_id',
    justOne: true,
});

module.exports = model('Order', orderSchema);