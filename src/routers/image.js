const ImageRouter = require('express').Router();
const ImageController = require('../controllers/image');

ImageRouter.route('/images')
    .post(ImageController.uploadImage);

module.exports = ImageRouter;
