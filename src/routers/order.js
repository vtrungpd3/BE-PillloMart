// === Route Cart  ===
const express = require('express');
const router = express.Router();

const {
    getAllOrder,
    createOrder
} = require('../controllers/order');

router.get('/s', getAllOrder);
router.post('/', createOrder);

module.exports = router;