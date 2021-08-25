const Product = require('../models/product');

const getAll = async (req, res) => {
    try {
        let search = {};
        const { name, category, type, pageInfo } = req.body;
        const { pageIndex = 1 } = pageInfo || {};

        if (name) {
            search.name = new RegExp(name, 'gim');
        }

        if (category) {
            search.category = category;
        }

        if (type) {
            search.type = type;
        }
            
        const products = await Product.find({ $or: [search] }).limit(10 * pageIndex).lean();
        const total = await Product.findOne({ _id: { $gt: products[products.length - 1]._id } }).select("_id").lean();
        const hasNextPage = total ? true : false;

        res.json({ result: products, pageInfo: { hasNextPage, pageIndex }});
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
        const { name, price, category, type, avatar } = req.body;
        const data = new Product({
            name,
            price,
            category,
            type,
            avatar
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
        const { name, price, category, type, avatar } = req.body;
        const data = new Product({
            name,
            price,
            category,
            type,
            avatar
        });

        const updateProduct = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
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

