// === Route Product ===
const express = require('express');
const router = express.Router();

const {
    createAddress,
    getAllAddress,
    deleteAddress,
    updateAddress,
} = require('../controllers/address');

router.get('/s', getAllAddress);
router
    .route('/')
    .post(createAddress)
    .put(updateAddress)
    .delete(deleteAddress);

module.exports = router;