// === Route User ===
const express = require('express');
const router = express.Router();

const {
    getAll,
    getById,
    deleteById,
    updateById,
    createUser
} = require('../controllers/user');

/**
 * @route GET api/User
 * @description get all User
 * @access public
 */

router.post('/', getAll);


/**
 * @route GET api/User/:id
 * @description get by id User
 * @access public
 */

router.get('/:id', getById);


/**
 * @route POST/api/User
 * @description add a new User
 * @access public
 */

router.post('/', createUser);

/**
 * @route PUT api/User/:id
 * @description update User
 * @access public
 */

router.put('/:id', updateById);

/**
  * @route DELETE api/User/:id
  * @description delete User
  * @access public
  */

router.delete('/:id', deleteById);

module.exports = router;