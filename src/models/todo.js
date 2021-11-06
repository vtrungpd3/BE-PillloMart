const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    isComplete: {
        type: Boolean,
        require: true,
        default: false
    },
}, {timestamps: true, versionKey: false});

module.exports = model('Todo', todoSchema);