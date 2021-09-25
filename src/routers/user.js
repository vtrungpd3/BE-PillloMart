// === Route User ===
const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/image');

const {
    getById,
    updateById,
} = require('../controllers/user');

router
    .route('/')
    .get(getById)
    .put(upload, updateById);

module.exports = router;