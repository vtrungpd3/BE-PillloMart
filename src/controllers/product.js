const Product = require('../models/product');
const UploadImage = require('../services/firebase');
const { pagination: { index, size } } = require('../config').api;
const { successResponse, errorCommonResponse } = require('../utils').common;

const controller = {};

controller.getAll = async (req, res) => {
    try {
        let search = {};
        const { name, category, type, pageInfo } = req.body;
        const { pageIndex = index.default } = pageInfo || {};

        if (name) {
            search.name = new RegExp(name, 'gim');
        }

        if (category) {
            search.category = category;
        }

        if (type) {
            search.type = type;
        }

        if (pageIndex < index.min) {
            return errorCommonResponse(res, 'pageIndex is out of range');
        }

        const result = await Product.find(search).skip(pageIndex * size.default).limit(size.max).lean();
        const hasNextPage = result.length === size.max;

        successResponse(res, result.slice(0, 10), { pageInfo: { hasNextPage, pageIndex } });
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controller.getById = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);

        if (!result._id) {
            errorCommonResponse(res, `${req.params.id} not found`);
        }
        
        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controller.createProduct = async (req, res) => {
    try {
        const { name, price, category, type } = req.body;
        const avatar = await UploadImage(`uploads/${req.file.filename}`, req.file.filename);

        if (!avatar) {
            return errorCommonResponse(res, 'upload failed');
        }

        const data = {
            name,
            price,
            category,
            type,
            avatar
        };

        const result = await Product.create(data);

        if (!result._id) {
            return errorCommonResponse(res, 'Create failed');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controller.deleteById = async (req, res) => {
    try {
        const result = await Product.deleteOne({_id: req.params.id});

        if (!result.deleteCount) {
            return errorCommonResponse(res, 'Deleted fail');
        }

        successResponse(res);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
    
};

controller.updateById = async (req, res) => {
    try {
        const { name, price, category, type } = req.body;
        const avatar = await UploadImage(`uploads/${req.file.filename}`, req.file.filename);

        if (!avatar) {
            return errorCommonResponse(res, 'upload failed');
        }

        const data = {
            name,
            price,
            category,
            type,
            avatar
        };

        const result = await Product.findByIdAndUpdate(req.params.id, data, { new: true });

        if (!result._id) {
            return errorCommonResponse(res, 'Update failed');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

module.exports = controller;

