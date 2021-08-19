// === Route note ===
const express = require('express');
const router = express.Router();

const {
    getAll,
    getById,
    deleteById,
    updateById,
    createProduct
} = require('../controllers/product');

/**
 * @route GET api/note
 * @description get all note
 * @access public
 */

router.get('/', getAll);


/**
 * @route GET api/note/:id
 * @description get by id note
 * @access public
 */

router.get('/:id', getById);


/**
 * @route POST/api/note
 * @description add a new note
 * @access public
 */

router.post('/', createProduct);

/**
 * @route PUT api/note/:id
 * @description update note
 * @access public
 */

router.put('/:id', updateById);

/**
  * @route DELETE api/note/:id
  * @description delete note
  * @access public
  */

router.delete('/:id', deleteById);

module.exports = router;