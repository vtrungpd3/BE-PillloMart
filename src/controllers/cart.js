const _ = require('lodash');

const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');

const getAllCart = async (req, res) => {
    try {
        const { id: userId } = req.userId;
        const { type = 'cart' } = req.body;

        const carts = await Cart.find({ userId, type }).select('_id').lean();

        if (!carts.length) {
            res.json({ result: [] });
        }
        const result = await CartItem
            .aggregate([{
                $match: {
                    cartId: { $in: _.map(carts, x => x._id) }
                }
            }, {
                $group: {
                    _id:  '$cartId',
                    cartItems: {
                        $push: '$$ROOT',
                    }
                }
            }, {
                $lookup: {
                    from: 'carts',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'cart'
                }
            },{
                $unwind: '$cart'
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: [ {cartItems: '$cartItems'}, '$cart'] }
                }
            }]);

        res.json({ status: true, result });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const getByIdCart = async (req, res) => {
    try {
        const result = await Cart.findById(req.params.id).lean();

        res.json({ status: true, result });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const getCart = async (req, res) => {
    try {
        const { cartId } = req.user;

        const result = await CartItem
            .aggregate([{
                $match: { cartId }
            }, {
                $group: {
                    _id:  '$cartId',
                    cartItems: {
                        $push: '$$ROOT',
                    }
                }
            }, {
                $lookup: {
                    from: 'cart',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'cart'
                }
            }, {
                $replaceRoot: {
                    newRoot: { $mergeObjects: [ {cartItems: '$cartItem'}, '$cart'] }
                }
            }]);

        res.json({ status: true, result: result[0] });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};


const createCart = async (req, res) => {
    try {
        let { cartId, userId } = req.userId;
        const { productId, quantity } = req.body;

        const product = await Product
            .findById(productId)
            .select('_id price')
            .lean();

        if (!product) {
            res.status(404).json({ status: false, error: 'Product not found!' });
        }

        const cart = await Cart.findById(cartId).select('_id').lean();

        if (!cart) {
            cartId = (await Cart.create({ userId, type: 'cart' }))?._id;
        }

        const result = await CartItem
            .findOneAndUpdate(
                { productId, cartId },
                { $set: { quantity, amount: quantity * product.price }},
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            .lean();

        res.json({ status: true , result });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
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
        const result = await Cart.create({ quantity, amount, userId, type: 'order' }); 

        // Update cartItems
        await CartItem.updateMany(
            { _id: { $in: cartItemIds }, cardId }, 
            { cardId: result._id  }
        );

        res.json({ status: true, result });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};


const deleteById = async (req, res) => {
    try {
        const cart = await CartItem.deleteOne({_id: req.params.id});

        if (!cart.deleteCount) {
            return res.status(404).json({ result: false, message: 'Deleted fail' });
        }
        
        res.status(200).json({ result: true, message: 'Deleted successfully' });
    } catch (exception) {
        res.status(500).json({ result: false, error: exception });
    }
    
};


module.exports = {
    getAllCart,
    createCart,
    getByIdCart,
    createOrder,
    getCart,
    deleteById
};