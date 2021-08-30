const _ = require('lodash');

const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');

const getAllCart = async (req, res) => {
    try {
        const { id: userId, cartId } = req.userId;
        const { type } = req.body;

        let carts = [];
        if (type) {
            carts = await Cart.find({ userId, type }).lean();
        } else {
            carts = await CartItem.find({ cartId }).lean();
        }

        res.json({ result: carts });
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
        const { cartId } = req.userId;
        const { productId, quantity } = req.body;

        const product = await Product
            .findById(productId)
            .select('_id price')
            .lean();

        if (!product) {
            res.status(404).json({ error: 'Product not found!' });
        }

        const cartItem = await CartItem
                .findOneAndUpdate(
                    { productId, cartId },
                    { $set: { quantity, amount: quantity * product.price }},
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
    getAllCart,
    addCart,
    getById,
    createOrder,
};