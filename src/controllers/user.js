const User = require('../models/user');
const Cart = require('../models/cart');
const { validatePassword } = require('../constants/enum');

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
            return user
        })

        res.json({ result: data });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const getById = async (req, res) => {
    try {
        const result = await User.findById(req.params.id);
        if (result) {
            res.json({ result });
        } else {
            res.status(404).end();
        }
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!validatePassword(password)) {
            return res.status(404).json({ error: "Password not valid"})
        }

        const hash = await argon2.hash(password);
        const data = {
            name,
            email,
            password: hash,
        };
        
        const resUser = await User.create(data);
        const objNew = resUser.toJSON();
        delete objNew.password;

        // Create Cart
        await Cart.create({ userId: objNew.id, type: 'cart' });

        res.json({result: objNew});
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const deleteById = async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.params.id});
        if (!user.deleteCount) {
            return res.status(404).json({ result: false, message: 'Deleted fail' });
        }
        res.json({ result: true, message: 'Deleted successfully' });
        res.status(200).end();
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
    
};

const updateById = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = new User({
            name,
            email,
            password,
        });

        const updateUser = await User.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updateUser);
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    createUser,
};