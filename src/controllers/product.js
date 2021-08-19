const Product = require('../models/product');

const getAll = async (req, res) => {
    try {
        let search = [];
        const { name, category, type } = req.body;

        if (name) {
            search.push({name: new RegExp(name, 'gim')});
        }

        if (category) {
            search.push({category});
        }

        if (type) {
            search.push({type});
        }

        const products = await Product.find({ $or: search }).lean();
        res.json({ result: products });
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const getById = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        if (result) {
            res.json({ result });
        } else {
            res.status(404).end();
        }
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, category, type } = req.body;

        const data = new Product({
            name,
            price,
            category,
            type,
            avatar: req.file.path 
        });

        const resProduct = await data.save();
        res.json({result: resProduct});
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

const deleteById = async (req, res) => {
    try {
        const product = await Product.deleteOne({_id: req.params.id});
        if (!product.deleteCount) {
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
        const { content, important } = req.body || {};

        const note = {
            content,
            important
        };

        const updateProduct = await Product.findByIdAndUpdate(req.params.id, note, { new: true });
        res.json(updateProduct);
    } catch (exception) {
        res.status(500).json({ error: exception });
    }
};

module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    createProduct
};

