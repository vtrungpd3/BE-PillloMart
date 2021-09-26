// === Route Product ===
const express = require('express');
const router = express.Router();

const {
    getAll,
    getById,
    deleteById,
    updateById,
    createProduct
} = require('../controllers/product');

router.post('/s', getAll);
router.post('/', createProduct);
router
    .route('/:id')
    .get(getById)
    .put(updateById)
    .delete(deleteById);

module.exports = router;