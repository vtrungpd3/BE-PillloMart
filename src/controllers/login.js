const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { common } = require('../utils');
const { compare } = require('../services/bcrypt');
const { genToken } = require('../services/authentication');

const Login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).lean();
    const passwordCorrect = await compare(password, (user || {}).password);

    if (!passwordCorrect) {
        return common.errorCommonResponse(res, 'invalid email or password');
    }

    let cart = await Cart.findOne({ userId: user._id }).select('_id').lean();
    let order = await Order.findOne({ userId: user._id }).select('_id').lean();

    if (!order) {
        order = await Order.create({ userId: user._id });
    }
    if (!cart) {
        cart = await Cart.create({ userId: user._id });
    }

    const token = await genToken({ _id: user._id.toString(), cartId: cart._id, orderId: order._id });
    
    // eslint-disable-next-line
    const { password: _, ...payload } = user;
    
    common.successResponse(res, {
        ...payload,
        token
    });
};

module.exports = {
    Login
};