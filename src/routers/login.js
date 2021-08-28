// === Route Login  ===
const express = require('express');
const router = express.Router();

const {
    Login,
} = require('../controllers/login');

/**
 * @route POST api/Login
 * @access public
 */

router.post('/', Login);

module.exports = router;