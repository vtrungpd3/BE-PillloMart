const product = require('./product');
const image = require('./image');

const initAppRoute = (server) => {
    server.use('/api/product', product);
    server.use('/api/upload', image);
};

module.exports = initAppRoute;