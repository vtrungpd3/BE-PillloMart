const mongoose = require('mongoose');
// const { MONGODB } = require('../config');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@pillowmart.pv3ig.mongodb.net/pillloMart?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: true });
        console.log('MongoDB is connected');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = connect;
