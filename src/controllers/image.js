const path = require('path');
const multer = require('multer');
const { limit, bodyField, mimeGroup } = require('../config').storage;
const { common } = require('../utils');

const controllers = {};

const storage = multer.diskStorage({
    // destination: rootPath || './uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const checkFileType = (file, cb) => {
    const mimetype = mimeGroup.image.includes(file.mimetype);

    if (mimetype) {
        return cb(null, true);
    }
    cb('The file is not in the correct format');
};

controllers.upload = multer({
    storage,
    limits: {
        fileSize: limit,
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single(bodyField);


controllers.uploadImage = async (req, res) => {
    await controllers.upload(req, res, err => {
        if (err || req.file === undefined) {
            common.errorCommonResponse(res, 'File not found');
        } else {
            common.successResponse(res, req.file.filename);
        }
    });
};

module.exports = controllers;
