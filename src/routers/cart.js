// === Route Cart  ===
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const {
    getAllCart,
    createCart,
    getByIdCart,
    createOrder,
    deleteById
} = require('../controllers/cart');

/**
 * @route GET api/cart/s
 * @access public
 */

router.get('/s', verifyToken, getAllCart);

/**
 * @route GET api/cart/:id
 * @access public
 */

router.get('/:id', verifyToken, getByIdCart);

/**
 * @route POST api/cart
 * @access public
 */

router.post('/', verifyToken, createCart);

/**
 * @route POST api/cart/order
 * @access public
 */

router.post('/order', verifyToken, createOrder);

/**
 * @route DELETE api/cart
 * @access public
 */

router.delete('/:id', verifyToken, deleteById);

module.exports = router;