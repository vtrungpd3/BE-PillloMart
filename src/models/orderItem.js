const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const orderItemSchema = new Schema({
    orderId: {
        type: ObjectId,
        required: true,
    },
    productId: {
        type: [ObjectId],
        required: true,
    },
    receiverId: {
        type: ObjectId,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

orderItemSchema.virtual('productItems', {
    ref: 'OrderProduct',
    localField: 'productId',
    foreignField: '_id',
    justOne: true,
});

orderItemSchema.virtual('receiver', {
    ref: 'OrderAddress',
    localField: 'receiverId',
    foreignField: '_id',
    justOne: true,
});

module.exports = model('OrderItem', orderItemSchema);