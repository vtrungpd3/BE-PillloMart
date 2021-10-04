const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { genSalt } = require('../services/bcrypt');
const { successResponse, errorCommonResponse, validatePassword } = require('../utils').common;
const UploadImage = require('../services/firebase');

const controllers = {};

controllers.getById = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const result = await User.findById(userId).populate('address').lean();

        if (result) {
            // eslint-disable-next-line
            const { password: _, ...payload } = result;
            successResponse(res, payload);
        } else {
            errorCommonResponse(res, 'user not found');
        }
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!validatePassword(password)) {
            return errorCommonResponse(res, 'Password not valid');
        }

        const hash = await genSalt(password);

        if (!hash) {
            return errorCommonResponse(res, 'Create user fail');
        }

        const data = {
            name,
            email,
            password: hash,
        };
        const user = await User.create(data);

        if (!user._id) {
            return errorCommonResponse(res, 'Create user failed');
        }

        const cart = await Cart.create({ userId: user._id });
        const order = await Order.create({ userId: user._id });

        if (!order) {
            return errorCommonResponse(res, 'Create order failed');
        }

        if (!cart) {
            return errorCommonResponse(res, 'Create cart failed');
        }

        successResponse(res);
    } catch (exception) {
        return errorCommonResponse(res, exception);
    }
};

controllers.updateById = async (req, res) => {
    try {
        const dataReq = req.body;
        const { _id: userId } = req.user;

        if (dataReq.avatar) {
            const avatar = await UploadImage(`uploads/${dataReq.avatar}`, dataReq.avatar);
            if (!avatar) {
                return errorCommonResponse(res, 'Upload avatar User failed');
            }
            dataReq.avatar = avatar;
        }

        const result = await User.findByIdAndUpdate(userId, { ...dataReq }, { new: true, runValidators: true }).lean();

        if (!result._id) {
            return errorCommonResponse(res, 'Update user failed');
        }
        
        // eslint-disable-next-line
        const { password: _, ...payload } = result;

        successResponse(res, {...payload});
    } catch (exception) {
        return errorCommonResponse(res, exception);
    }
};

module.exports = controllers;