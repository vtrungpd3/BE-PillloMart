const mongoose = require('mongoose');
const { MONGODB } = require('../utils/config');

const uri = "mongodb+srv://admin:admin@pillowmart.pv3ig.mongodb.net/pillloMart?retryWrites=true&w=majority"

const ConnectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB is connected');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = ConnectDB;
