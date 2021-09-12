const product = require('./product');
const image = require('./image');
const user = require('./user');
const login = require('./login');
const cart = require('./cart');

const authService = require('../services/authentication');

const initAppRoute = (server, prefix, authHeaderKey) => {
    server.use(`${prefix}/product`, product);
    server.use(`${prefix}/upload`, image);
    server.use(`${prefix}/login`, login);
    server.use(`${prefix}/user`, user);
    server.use(`${prefix}/cart`, authService.authentication(authHeaderKey), cart);
};

module.exports = initAppRoute;
