// === Route User ===
const express = require('express');
const router = express.Router();

const {
    getById,
    updateById,
} = require('../controllers/user');

router
    .route('/')
    .get(getById)
    .put(updateById);

module.exports = router;