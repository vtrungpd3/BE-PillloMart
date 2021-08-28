// === Route Login  ===
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const {
    getByUserId,
    deleteById,
    addCart,
} = require('../controllers/cart');

/**
 * @route GET api/Cart
 * @access public
 */

router.get('/s', verifyToken, getByUserId);

/**
 * @route POST api/Cart
 * @access public
 */

 router.post('/', verifyToken, addCart);

 /**
  * @route DELETE api/Cart/:id
  * @description delete User
  * @access public
  */

router.delete('/:id', verifyToken, deleteById);

module.exports = router;