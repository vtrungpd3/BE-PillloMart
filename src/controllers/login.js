const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const User = require('../models/user')
const Cart = require('../models/cart')

const Login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const cart = await Cart
        .findOne({ userId, type: 'cart' })
        .select('_id')
        .lean();
    const passwordCorrect = user === null
        ? false
        : await argon2.verify(user.password, password);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid email or password'
        })
    }

    const userForToken = {
        name: user.name,
        email: user.email,
        id: user._id,
        cartId: cart._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60*24 })

    res.status(200).send({ token, email: user.email, name: user.name })
};

module.exports = {
    Login
};