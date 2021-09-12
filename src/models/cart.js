const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const cartSchema = new Schema({
    userId: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },
    quantity: {
        type: Number,
        require: true,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    }
}, {timestamps: true, versionKey: false});


module.exports = model('Cart', cartSchema);