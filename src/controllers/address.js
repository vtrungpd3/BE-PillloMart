const Address = require('../models/address');
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

        const address = await Address.create({ ...dateReq, userId }, { runValidators: true });

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