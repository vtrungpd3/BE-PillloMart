// === Route Product ===
const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/image');

const {
    getAll,
    getById,
    deleteById,
    updateById,
    createProduct
} = require('../controllers/product');

router.post('/s', getAll);
router.post('/', upload, createProduct);
router
    .route('/:id')
    .get(getById)
    .put(updateById)
    .delete(deleteById);

module.exports = router;