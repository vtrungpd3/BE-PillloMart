const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const OrderProduct = require('../models/orderProduct');
const OrderAddress = require('../models/orderAddress');
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
        
        const result = await OrderItem
            .find({ orderId: orders._id })
            .populate('productItems')
            .populate('receiver')
            .lean();

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

controllers.createOrder = async (req, res) => {
    try {
        const { orderId } = req.user;
        const { itemsCart, info } = req.body;

        const dataCart = await CartItem.find({ _id: { $in: itemsCart }}).populate('products').lean();
        let { _id: addressId, ...payloadAddress } = await Address
            .findById(info)
            .select('name phone address _id')
            .lean();
        if (!dataCart || !addressId) {
            return errorCommonResponse(res, 'order fail');
        }

        const orderAddress = await OrderAddress
            .findOne({ addressId: info })
            .select('name phone address _id')
            .lean();

        let { _id: OrderAddressId, ...payloadOrderAddress } = orderAddress || {};

        if (JSON.stringify({...payloadAddress}) !== JSON.stringify({...payloadOrderAddress}) || !OrderAddressId) {
            OrderAddressId = (await OrderAddress.create({ ...payloadAddress, addressId }))?._id;
        }

        const dataProduct = (dataCart || []).map((item) => ({
            name: item.products.name,
            price: item.products.price,
            quantity: item.quantity,
            avatar: item.products.avatar,
            amount: item.amount,
        }));

        const createProduct = await OrderProduct.create(dataProduct);
        const productId = createProduct.map(product => product._id);
        const total = createProduct.reduce((sum, product) => sum + product?.amount, 0);

        if (!createProduct || !addressId || !productId.length) {
            return errorCommonResponse(res, 'order fail');
        }

        const result = await OrderItem.create({ total, productId, receiverId: OrderAddressId, orderId });
        if (!result) {
            return errorCommonResponse(res, 'order fail');
        }
        const cart = await CartItem.deleteMany({ _id: { $in: itemsCart }}).lean();
        if (!cart) {
            return errorCommonResponse(res, 'remove carts fail');
        }

        successResponse(res, result);
    } catch (exception) {
        errorCommonResponse(res, exception);
    }
};

module.exports = controllers;