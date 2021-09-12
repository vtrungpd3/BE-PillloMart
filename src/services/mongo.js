const mongoose = require('mongoose');

const onConnect = () => {
    console.log('\x1b[31m%s\x1b[0m', '[Mongo]', '\x1b[0m', 'Connect Successfully');
};

const onError = (error) => {
    console.log('\x1b[31m%s\x1b[0m', '[Mongo] Error: ', '\x1b[0m', error);
};

const connect = async (mongoConfig) => {
    const db = mongoose.connection;

    db.on('error', onError);
    db.on('open', onConnect);

    await mongoose.connect(mongoConfig.uri, mongoConfig.options);
};

module.exports = {
    connect
};
