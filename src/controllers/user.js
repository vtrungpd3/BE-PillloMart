const User = require('../models/user');
const Cart = require('../models/cart');
const { genSalt } = require('../services/bcrypt');
const { successResponse, errorCommonResponse, validatePassword } = require('../utils').common;
const UploadImage = require('../services/firebase');

const controllers = {};

controllers.getById = async (req, res) => {
    try {
        const result = await User.findById(req.params.id);
        if (result) {
            successResponse(res, result);
        } else {
            errorCommonResponse(res, 'id not found');
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

        if (!cart._id) {
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

        if (req.file.filename) {
            dataReq.avatar = await UploadImage(`uploads/${req.file.filename}`, req.file.filename);
        }

        if (!dataReq.avatar && req.file.filename) {
            return errorCommonResponse(res, 'Upload avatar User failed');
        }

        const result = await User.findByIdAndUpdate(req.params.id, { ...dataReq }, { new: true }).lean();

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