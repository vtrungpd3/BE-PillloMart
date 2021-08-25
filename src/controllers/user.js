const User = require('../models/user');

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

        res.json({ result: users });
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
        console.log('req.body', req.body);
        const { name, email, password } = req.body;
        const data = {
            name,
            email,
            password,
        };
        const resUser = await User.create(data);
        res.json({result: resUser});
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
    createUser
};