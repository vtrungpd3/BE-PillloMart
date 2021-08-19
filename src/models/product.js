const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 5
    },
    avatar: {
        type: String,
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        enum: ['Gucci', 'Chanel', 'LV', 'Dior'],
        default: 'Gucci',
        required: 'Please specify at least one factor.'
    },
    type: {
        type: String,
        enum: ['Cam', 'Do', 'Den', 'Vang'],
        default: 'Cam',
        required: 'Please specify at least one factor.'
    },
}, {timestamps: true});

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Product', productSchema);