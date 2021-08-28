const product = require('./product');
const image = require('./image');
const user = require('./user');
const login = require('./login');
const cart = require('./cart');

const initAppRoute = server => {
    server.use('/api/product', product);
    server.use('/api/upload', image);
    server.use('/api/user', user);
    server.use('/api/login', login);
    server.use('/api/cart', cart);
};

module.exports = initAppRoute;
