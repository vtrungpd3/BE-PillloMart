const Cart = require('../models/cart');

const getByUserId = async (req, res) => {
    try {
        const { id } = req.userId;
        const users = await Cart.find({ userId: id }).lean();

        res.json({ result: users });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const addCart = async (req, res) => {
    try {
        const { id } = req.userId;

        const data = {
            userId: id,
        };

        let itemCart = await Cart.create(data);
        
        res.json({ status: true , result: itemCart });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const deleteById = async (req, res) => {
    try {
        const user = await Cart.deleteOne({_id: req.params.id});
        if (!user.deleteCount) {
            return res.status(404).json({ result: false, message: 'Deleted fail' });
        }
        res.json({ result: true, message: 'Deleted successfully' });
        res.status(200).end();
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
    
};

module.exports = {
    getByUserId,
    deleteById,
    addCart,
};