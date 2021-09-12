const router = require('express').Router();
const { uploadImage } = require('../controllers/image');

router.post('/images', uploadImage);

module.exports = router;
