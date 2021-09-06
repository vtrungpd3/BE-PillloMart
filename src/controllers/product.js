const Product = require('../models/product');

const getAll = async (req, res) => {
    try {
        let search = {};
        const { name, category, type, pageInfo } = req.body;
        const { pageIndex = 1 } = pageInfo || {};

        console.log('req.body', req.body);

        if (name) {
            search.name = new RegExp(name, 'gim');
        }

        if (category) {
            search.category = category;
        }

        if (type) {
            search.type = type;
        }

        const result = await Product.find(search).skip((pageIndex - 1) * 10).limit(11).lean();
        const hasNextPage = result.length === 11;

        res.json({ status: true, result: result.slice(0, 10), pageInfo: { hasNextPage, pageIndex }});
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const getById = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);

        if (result) {
            res.json({ status: true, result });
        } else {
            res.status(404).end();
        }

    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, category, type } = req.body;

        const data = {
            name,
            price,
            category,
            type,
            avatar: req.file.filename
        };

        const result = await Product.create(data);

        res.json({ status: true, result });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

const deleteById = async (req, res) => {
    try {
        const result = await Product.deleteOne({_id: req.params.id});
        if (!result.deleteCount) {
            return res.status(404).json({ status: false, message: 'Deleted fail' });
        }
        res.status(200).json({ status: true, message: 'Deleted successfully' });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
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

        const result = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json({ status: true, result });
    } catch (exception) {
        res.status(500).json({ status: false, error: exception });
    }
};

module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    createProduct
};

