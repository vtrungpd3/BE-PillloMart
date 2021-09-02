const CartItem = require('../models/cartItem');
const User = require('../models/user');

const getAll = async (req, res) => {
    try {
        const { userId } = req.body;
        const users = await CartItem.find({ userId }).lean();

        res.json({ result: users });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const addCart = async (req, res) => {
    try {
        const { productItem, userId } = req.body;
        const { id } = userId;

        const data = {
            productItem,
            userId: id,
        };

        const item = await User.findOne({ id });

        let itemCart = {};
        if (item) {
            itemCart = await Cart.findOneAndUpdate(item.id, data, { new: true });
        } else {
            itemCart = await Cart.create(data);
        }
        
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
    getAll,
    deleteById,
    addCart,
};