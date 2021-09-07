const User = require('../models/user');
const Cart = require('../models/cart');
const { validatePassword } = require('../utils/common');

const argon2 = require('argon2');

const getAll = async (req, res) => {
    try {
        let search = {};
        const { name, email } = req.body;

        if (name) {
            search.name = new RegExp(name, 'gim');
        }

        if (email) {
            search.email = email;
        }

        const users = await User.find({ $or: [search] }).lean();
        const data = users.map((user) => {
            delete user.password;
            return user;
        });

        res.json({ status: true, result: data });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const getById = async (req, res) => {
    try {
        const result = await User.findById(req.params.id);
        if (result) {
            res.json({ status: true, result });
        } else {
            res.status(404).json({ status: false, message: 'id not found' });
        }
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!validatePassword(password)) {
            return res.status(404).json({ status: false, error: 'Password not valid'});
        }

        const hash = await argon2.hash(password);
        const data = {
            name,
            email,
            password: hash,
        };
        
        await Promise.all([User.create(data), Cart.create({ userId: objNew.id, type: 'cart' }) ])

        res.json({ status: true });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const deleteById = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        if (!user.deleteCount) {
            return res.status(404).json({ status: false, message: 'Deleted fail' });
        }
        res.status(200).json({ status: true, message: 'Deleted successfully' });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
    
};

const updateById = async (req, res) => {
    try {
        const { name } = req.body;

        const updateUser = await User.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.status(200).json({ status: true, result: updateUser });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    createUser,
};