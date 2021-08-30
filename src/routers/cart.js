// === Route Login  ===
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const {
	getAllCart,
	addCart,
	getById,
	createOrder,
	deleteById
} = require('../controllers/cart');

/**
 * @route GET api/Cart
 * @access public
 */

router.get('/s', verifyToken, getAllCart);

/**
 * @route GET api/:id
 * @access public
 */

router.get('/:id', verifyToken, getById);

/**
 * @route POST api/Cart
 * @access public
 */

router.post('/', verifyToken, addCart);

/**
 * @route POST api/Cart
 * @access public
 */

router.post('/order', verifyToken, createOrder);

/**
 * @route DELETE api/Cart
 * @access public
 */

router.delete('/:id', verifyToken, deleteById);

module.exports = router;