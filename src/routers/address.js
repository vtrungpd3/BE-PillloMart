// === Route Product ===
const express = require('express');
const router = express.Router();

const {
    createAddress,
    getAllAddress,
    deleteAddress,
    updateAddress,
    updateDefaultAddress,
} = require('../controllers/address');

router.get('/s', getAllAddress);
router.post('/default', updateDefaultAddress);
router
    .route('/')
    .post(createAddress)
    .put(updateAddress)
    .delete(deleteAddress);

module.exports = router;