// === Route Cart  ===
const express = require('express');
const router = express.Router();

const {
    getAllCart,
    createCart,
    deleteById
} = require('../controllers/cart');

router.get('/s', getAllCart);
router.post('/', createCart);
router.delete('/:id', deleteById);

module.exports = router;