const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const orderSchema = new Schema({
    userId: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },
}, {timestamps: true, versionKey: false});

module.exports = model('Order', orderSchema);