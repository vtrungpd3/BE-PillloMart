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
        
        const result = await OrderItem.find({ orderId: orders._id }).lean();
        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.createOrder = async (req, res) => {
    try {
        const { _id: userId, orderId, cartId } = req.user;
        const { itemsCart, info } = req.body;

        const dataCart = await CartItem.find({ _id: { $in: itemsCart }}).populate('products').lean();
        const dataAddress = await Address.findById(info).select('name phone address -_id').lean();

        const dataProduct = (dataCart || []).map(async (item) => {
            const data = {
                name: item.products.name,
                price: item.products.price,
                quantity: item.quantity,
                avatar: item.products.avatar,
                amount: item.amount,
            };
            return await OrderItem.create({...data, ...dataAddress, orderId});
        });

        const result = await Promise.all(dataProduct);
        const cart = await CartItem.deleteMany({ _id: { $in: itemsCart }}).lean();

        if (!cart) {
            errorCommonResponse(res, 'remove cart fail');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

module.exports = controllers;