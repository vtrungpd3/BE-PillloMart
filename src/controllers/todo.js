const Todo = require('../models/todo');
const { successResponse, errorCommonResponse } = require('../utils').common;

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const search = {};
        const { isComplete } = req.body;

        if (isComplete) {
            search.isComplete = isComplete;
        }

        const result = await Todo.find(search).lean();
        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controller.createTodo = async (req, res) => {
    try {
        const dataReq = req.body;
        const result = await Todo.create(dataReq);

        if (!result) {
            return errorCommonResponse(res, 'Create failed');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controller.deleteById = async (req, res) => {
    try {
        const { deletedCount } = await Todo.deleteOne({_id: req.params.id});

        if (!deletedCount) {
            return errorCommonResponse(res, 'Deleted fail');
        }

        successResponse(res);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
    
};

controller.updateById = async (req, res) => {
    try {
        const dataReq = req.body || {};
        const result = await Todo.findByIdAndUpdate(req.params.id, dataReq, { new: true, runValidators: true });

        if (!result._id) {
            return errorCommonResponse(res, 'Update failed');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controller.getById = async (req, res) => {
    try {
        const result = await Todo.findById(req.params.id);

        if (!result._id) {
            return errorCommonResponse(res, 'Get by id failed');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

module.exports = controller;

