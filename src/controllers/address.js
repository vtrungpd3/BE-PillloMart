const Address = require('../models/address');
const User = require('../models/user');
const { successResponse, errorCommonResponse } = require('../utils').common;

const controllers = {};

controllers.getAllAddress = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const address = await Address.find({ userId });

        if (address) {
            successResponse(res, address);
        } else {
            errorCommonResponse(res, 'get All Address fail');
        }
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.createAddress = async (req, res) => {
    try {
        const dateReq = req.body;
        const { _id: userId } = req.user;

        let defaultAddress = false;

        const listAddress = await Address.find({ userId });
        if (!listAddress.length) {
            defaultAddress = true;
        }

        const address = await Address.create({ ...dateReq, userId, defaultAddress });

        if (address) {
            successResponse(res, address);
        } else {
            errorCommonResponse(res, 'create address fail');
        }
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.updateAddress = async (req, res) => {
    try {
        const { id: addressId, ...payload } = req.body;

        const address = await Address.findOneAndUpdate(
            { _id: addressId },
            { $set: { ...payload }},
            { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
        );

        if (address) {
            successResponse(res, address);
        } else {
            errorCommonResponse(res, 'update address fail');
        }
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.updateDefaultAddress = async (req, res) => {
    try {
        const { id: addressId } = req.body;
        const { _id: userId } = req.user;

        const resetAddress = await Address.updateMany(
            { userId },
            { $set: { defaultAddress: false }},
            { multi: true }
        );

        if (!resetAddress) {
            errorCommonResponse(res, 'update address fail');
        }

        const address = await Address.findOneAndUpdate(
            { _id: addressId },
            { $set: { defaultAddress: true }},
            { new: true, runValidators: true }
        );

        const updateUser = await User.findByIdAndUpdate(
            { _id: userId },
            { $set: { addressId }}
        );

        if (!updateUser) {
            return errorCommonResponse(res, 'update address user default fail');
        }

        if (address) {
            successResponse(res, address);
        } else {
            errorCommonResponse(res, 'update address fail');
        }
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.deleteAddress = async (req, res) => {
    try {
        const { id: addressId } = req.body;

        const address = await Address.deleteOne({ _id: addressId });

        if (!address.deletedCount) {
            errorCommonResponse(res, 'Deleted fail');
        }

        successResponse(res);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

module.exports = controllers;