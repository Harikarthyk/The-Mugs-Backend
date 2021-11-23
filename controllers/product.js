const Product = require("../models/Product");
const WhereClause = require("../utils/whereClause");

exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        return res.status(200).json({
            success: true,
            product: savedProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    };
};

exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    };
};

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        return res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    };
};

exports.getAllProduct = async (req, res) => {
    try {

        const productsObj = new WhereClause(Product, req.query, req.user.role).search().filter();


        const availableProducts = await productsObj.base;

        const availableProductCount = availableProducts.length;

        const { limit } = req.query;

        const RESULT_PER_PAGE = Number(limit) || 2;

        productsObj.pager(RESULT_PER_PAGE);

        const products = await productsObj.base.clone();

        const totalProductsCount = products.length;

        return res.status(200).json({
            success: true,
            products,
            availableProductCount,
            totalProductsCount
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message,
            success: false
        });
    };
};

