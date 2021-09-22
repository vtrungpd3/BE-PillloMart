// === Route User ===
const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/image');

const {
    getById,
    updateById,
    createUser
} = require('../controllers/user');

router
    .route('/')
    .post(createUser)
    .get(getById)
    .put(upload, updateById);

module.exports = router;