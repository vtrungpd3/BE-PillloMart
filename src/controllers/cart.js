const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');
const { successResponse, errorCommonResponse } = require('../utils').common;

const controllers = {};

controllers.getAllCart = async (req, res) => {
    try {
        const { _id: userId, cartId } = req.user;
        const { cartItemId } = req.body;
        let carts = await Cart.findById(cartId);

        if (!carts) {
            carts = await Cart.create({ userId });
        }

        if (!!(cartItemId || []).length) {
            carts.cartItemId = cartItemId;
        }
        
        const result = await CartItem.find({ _id: { $in: carts.cartItemId }}).populate('products').lean();
        
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

        const cartItem = await CartItem
            .findOneAndUpdate(
                { productId },
                { $set: { quantity, amount: quantity * product.price }},
                { new: true, upsert: true, setDefaultsOnInsert: true }
            ).lean();

        if (!cartItem) {
            errorCommonResponse(res, 'Add cart fail');
        }

        const result = await Cart.findByIdAndUpdate(
            { _id: cartId },
            { $push: { cartItemId: cartItem._id }},
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).lean();

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.updateById = async (req, res) => {
    try {
        const { quantity, price } = req.body || {};

        if (!price) {
            errorCommonResponse(res, 'price is require');
        }

        if (!quantity) {
            errorCommonResponse(res, 'quantity is require');
        }

        const cart = await CartItem.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { quantity, amount: quantity * price }},
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).populate('products').lean();

        if (!cart) {
            errorCommonResponse(res, 'Update cart fail');
        }

        successResponse(res, cart);
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