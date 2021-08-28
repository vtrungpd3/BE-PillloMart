const _ = require('lodash');

const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');



const getByUserId = async (req, res) => {
    try {
        const { id: userId } = req.userId;
        const { type } = req.body;
        const cars = await Cart.find({ userId, type }).lean();

        res.json({ result: cars });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const getById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).lean();

        res.json({ result: cart });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
}


const addCart = async (req, res) => {
    try {
        const { id: userId } = req.userId;
        const { productId, quantity } = req.body;

        const product = await Product
            .findById(productId)
            .select('_id amount')
            .lean();

        if (!product) {
            res.status(404).json({ error: 'Product not found!' });
        }

        const cart = await Cart
            .findOne({ userId, type: 'cart' })
            .select('_id')
            .lean();

        const cartItem = await CartItem
            .findOneAndUpdate(
                { productId, cardId: cart._id },
                { $set: { quantity, amount: quantity * product.amount }},
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            .lean();

        res.json({ status: true , result: cartItem });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const createOrder = async (req, res) => {
    try {
        const { id: userId } = req.userId;
        const { cartItemIds, cardId } = req.body;

        const cartItems = await  CartItem
            .find( { _id: { $in: cartItemIds}, cardId })
            .select('quantity, amount')
            .lean();
        
        // Sum quantity, amount
        const quantity = _.sumBy(cartItems, x => x.quantity);
        const amount = _.sumBy(cartItems, xx => xx.amount);

        // Create Order
        const order = await Cart.create({ quantity, amount, userId, type: 'order' }); 

        // Update cartItems
        await CartItem.updateMany(
            { _id: { $in: cartItemIds }, cardId }, 
            { cardId: order._id  }
        );

        res.json({ status: true , result: order });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

// const deleteById = async (req, res) => {
//     try {
//         const user = await Cart.deleteOne({_id: req.params.id});
//         if (!user.deleteCount) {
//             return res.status(404).json({ result: false, message: 'Deleted fail' });
//         }
//         res.json({ result: true, message: 'Deleted successfully' });
//         res.status(200).end();
//     } catch (exception) {
//         res.status(500).json({ error: exception });
//     }
    
// };

module.exports = {
    getByUserId,
    // deleteById,
    addCart,
    getById,
    createOrder,
};