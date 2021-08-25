const product = require('./product');
const image = require('./image');
const user = require('./user');

const initAppRoute = server => {
    server.use('/api/product', product);
    server.use('/api/upload', image);
    server.use('/api/user', user);
};

module.exports = initAppRoute;
