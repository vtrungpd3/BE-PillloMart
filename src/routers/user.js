// === Route User ===
const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/image');

const {
    getById,
    updateById,
    createUser
} = require('../controllers/user');

router.post('/', createUser);
router
    .route('/:id')
    .get(getById)
    .put(upload, updateById);

module.exports = router;