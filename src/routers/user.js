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
 * @route POST api/user/s
 * @description get all User
 * @access public
 */

router.post('/s', getAll);


/**
 * @route GET api/user/:id
 * @description get by id User
 * @access public
 */

router.get('/:id', getById);


/**
 * @route POST/api/user
 * @description add a new User
 * @access public
 */

router.post('/', createUser);

/**
 * @route PUT api/user/:id
 * @description update User
 * @access public
 */

router.put('/:id', updateById);

/**
  * @route DELETE api/user/:id
  * @description delete User
  * @access public
  */

router.delete('/:id', deleteById);

module.exports = router;