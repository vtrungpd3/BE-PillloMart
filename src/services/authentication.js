const jwt = require('jsonwebtoken');
const { common } = require('../utils');
const jwtConfig = (require('../config').app || {}).jwt;
const User = require('../models/user');

const authService = {};
                                                                    
authService.authentication = ({ authKey = 'authorization' } = {}) => {

    return async function (req, res, next) {
        const token = req.headers[authKey];
        if (!token) {
            return common.errorCommonResponse(res, 'token is required');
        }
        const isValid = await authService.verifyToken(token);
        if (!isValid) {
            return common.errorCommonResponse(res, 'token is invalid');
        }

        const user = await User.findById({ _id: isValid._id }).lean();
        if (!user) {
            return common.errorCommonResponse(res, 'user not exist');
        }
        
        req.user = {...user, cartId: isValid.cartId, orderId: isValid.orderId };
        next();
    };
};

authService.verifyToken = (token) => {
    return new Promise(resolve => {
        jwt.verify(token, jwtConfig.secret, (err, decoded) => {
            if (err) {
                return resolve(false);
            }
            resolve(decoded);
        });
    });
};

authService.genToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtConfig.secret, jwtConfig.options || {} ,(err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};

module.exports = authService;