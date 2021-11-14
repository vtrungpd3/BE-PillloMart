// === Route Cart  ===
const express = require('express');
const router = express.Router();

const {
    getAll,
    createTodo,
    deleteById,
    updateById,
    getById
} = require('../controllers/todo');

router.post('/s', getAll);
router.post('/', createTodo);
router.delete('/:id', deleteById);
router.put('/:id', updateById);
router.get('/:id', getById);

module.exports = router;