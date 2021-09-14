const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');
const { successResponse, errorCommonResponse } = require('../utils').common;

const controllers = {};

controllers.getAllCart = async (req, res) => {
    try {
        const { _id: userId, cartId } = req.user;
        let carts = await Cart.findById(cartId);

        if (!carts) {
            carts = await Cart.create({ userId });
        }
        
        const result = await CartItem.find({ cartId: carts._id }).populate('products').lean();
        
        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};


controllers.createCart = async (req, res) => {
    try {
        let { cartId, _id: userId } = req.user;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId).select('_id price').lean();
        if (!product) {
            errorCommonResponse(res, 'Product not found');
        }

        const cart = await Cart.findById(cartId).select('_id').lean();
        if (!cart) {
            cartId = ((await Cart.create({ userId })) || {})._id;
        }

        const result = await CartItem
            .findOneAndUpdate(
                { productId, cartId },
                { $set: { quantity, amount: quantity * product.price }},
                { new: true, upsert: true, setDefaultsOnInsert: true }
            ).lean();

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};


controllers.deleteById = async (req, res) => {
    try {
        const cart = await CartItem.deleteOne({ _id: req.params.id });

        if (!cart.deletedCount) {
            errorCommonResponse(res, 'Deleted fail');
        }
        
        successResponse(res);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};


module.exports = controllers;