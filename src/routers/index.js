const product = require('./product');
const image = require('./image');
const user = require('./user');
const login = require('./login');
const cart = require('./cart');
const order = require('./order');

const authService = require('../services/authentication');

const initAppRoute = (server, prefix, authHeaderKey) => {
    server.use(`${prefix}/product`, product);
    server.use(`${prefix}/upload`, image);
    server.use(`${prefix}/login`, login);
    server.use(`${prefix}/user`, authService.authentication(authHeaderKey), user);
    server.use(`${prefix}/cart`, authService.authentication(authHeaderKey), cart);
    server.use(`${prefix}/order`, authService.authentication(authHeaderKey), order);
};

module.exports = initAppRoute;
