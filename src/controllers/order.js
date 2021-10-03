const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Address = require('../models/address');
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
    try {
        const { _id: userId, cartId } = req.user;
        const { itemsCart, info } = req.body;

        const dataCart = await CartItem.find({ _id: { $in: itemsCart }}).populate('products').lean();
        const dataProduct = (dataCart || []).map((item) => ({
            name: item.products.name,
            price: item.products.price,
            quantity: item.quantity,
        }));


        const dataAddress = await Address.findById(info).lean();

        const dataOrder = await Order.create({ ...dataProduct, ...dataAddress });

        const cart = await Cart
            .findByIdAndUpdate(
                { _id: cartId },
                { $pull: { cartItemId: { $in: itemsCart }}},
            ).lean();

        if (!cart) {
            errorCommonResponse(res, 'remove cart fail');
        }

        successResponse(res, dataOrder);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

module.exports = controllers;