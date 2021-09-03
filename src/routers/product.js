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

/**
 * @route POST api/product/s
 * @description get all product
 * @access public
 */

router.post('/s', getAll);


/**
 * @route GET api/product/:id
 * @description get by id product
 * @access public
 */

router.get('/:id', getById);


/**
 * @route POST/api/product
 * @description add a new product
 * @access public
 */

router.post('/', upload, createProduct);

/**
 * @route PUT api/product/:id
 * @description update product
 * @access public
 */

router.put('/:id', updateById);

/**
  * @route DELETE api/product/:id
  * @description delete product
  * @access public
  */

router.delete('/:id', deleteById);

module.exports = router;