const mongoose = require('mongoose');
const { MONGODB } = require('../utils/config');

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('MongoDB is connected');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = ConnectDB;