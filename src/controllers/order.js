const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const { successResponse, errorCommonResponse } = require('../utils').common;

const controllers = {};

controllers.getAllOrder = async (req, res) => {
    try {
        const { _id: userId, orderId } = req.user;
        let orders = await Order.findById(orderId);

        if (!orders) {
            orders = await Order.create({ userId });
        }
        
        const result = await CartItem.find({ _id: { $in: orders.cartItemId }}).populate('products').lean();
        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.createOrder = async (req, res) => {
    /**
     * TODO: Update Price of order
     */
    try {
        const { _id: userId, orderId, cartId } = req.user;
        const { itemsCart } = req.body;

        let orders = await Order.findById(orderId);

        if (!orders) {
            orders = await Order.create({ userId });
        }

        const result = await Order.findByIdAndUpdate(
            { _id: orders._id },
            { $set: { cartItemId: itemsCart }},
            { new: true, upsert: true, setDefaultsOnInsert: true });

        if (!result) {
            errorCommonResponse(res, 'create order fail');
        }
        OrderItem
        const cart = await Cart
            .findByIdAndUpdate(
                { _id: cartId },
                { $pull: { cartItemId: { $in: itemsCart }}},
            ).lean();

        if (!cart) {
            errorCommonResponse(res, 'remove cart fail');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

module.exports = controllers;