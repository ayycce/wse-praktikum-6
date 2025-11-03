const express = require('express');
const router = express.Router();
let products = require('../data/products.data');

// ---- IMPORT MIDDLEWARE VALIDASI ----
const validateProduct = require('../middlewares/validateProduct');

// GET /api/products/ (Get All)
router.get('/', (req, res) => {
    res.json({ success: true, data: products });
});

// GET /api/products/:id (Get by ID)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
});

// POST /api/products (Create)
// ---- MIDDLEWARE DITERAPKAN DI SINI ----
router.post('/', validateProduct, (req, res) => {
    const { name, price, stock } = req.body;
    const newProduct = { id: Date.now(), name, price, stock: stock ?? 0 };
    products.push(newProduct);
    res.status(201).json({
        success: true,
        message: 'Product created',
        data: newProduct
    });
});

// PUT /api/products/:id (Update Full)
// ---- MIDDLEWARE DITERAPKAN DI SINI ----
router.put('/:id', validateProduct, (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    products[index] = { id, name, price, stock: stock ?? products[index].stock };
    res.json({
        success: true,
        message: 'Product updated',
        data: products[index]
    });
});

// PATCH /api/products/:id (Update Partial)
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = products[index];
    const { name, price, stock } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;

    res.json({
        success: true,
        message: 'Product partially updated',
        data: product
    });
});

// DELETE /api/products/:id (Delete)
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    products.splice(index, 1);
    res.json({ success: true, message: 'Product deleted' });
});

module.exports = router;

// Route untuk tes error handler
router.get('/crash/test', (req, res, next) => {
    const err = new Error('Tes error sengaja');
    next(err);
});
