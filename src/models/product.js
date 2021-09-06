const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
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
    category: {
        type: String,
        enum: ['canada', 'usa', 'japan'],
        default: 'canada',
        required: 'Please specify at least one factor.'
    },
    type: {
        type: String,
        enum: ['cotton', 'rubber'],
        default: 'cotton',
        required: 'Please specify at least one factor.'
    },
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);