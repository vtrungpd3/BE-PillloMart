const mongoose = require('mongoose');
const { MONGODB } = require('../config');

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: true });
        console.log('MongoDB is connected');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = ConnectDB;
