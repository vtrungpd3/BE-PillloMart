// === Route Cart  ===
const express = require('express');
const router = express.Router();

const {
    getAll,
    createTodo,
    deleteById,
    updateById
} = require('../controllers/todo');

router.post('/s', getAll);
router.post('/', createTodo);
router.delete('/:id', deleteById);
router.put('/:id', updateById);

module.exports = router;