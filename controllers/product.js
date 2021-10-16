const Product = require("../models/Product");

exports.addProduct = async(req, res) => {
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

exports.updateProduct = async(req, res) => {
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

exports.getProduct = async(req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        return res.status(200).json({
            success: true,
            product: product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: error
        });
    };
};

exports.getAllProduct = async(req, res) => {
    try{
        const { isAdmin } = req.user;
        const { sort, category, query } = req.query;
        let products = [];
        if(sort && category && query){
            if(isAdmin === true){
                products = await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                    categories: {
                        $in: [category],
                    },
                }).sort({ createdAt: sort });
            }
            else {
                products = await await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                    categories: {
                        $in: [category],
                    },
                    isActive: true
                }).sort({ createdAt: sort });
            };
        }else if(sort && !category && query){
            if(isAdmin === true){
                products = await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                }).sort({ createdAt: sort });
            }
            else {
                products = await await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                    isActive: true
                }).sort({ createdAt: sort });
            };
        }else if(sort && category && !query){
            if(isAdmin === true){
                products = await Product.find({ 
                    categories: {
                        $in: [category],
                    },
                }).sort({ createdAt: sort });
            }
            else {
                products = await await Product.find({ 
                    categories: {
                        $in: [category],
                    },
                    isActive: true
                }).sort({ createdAt: sort });
            };
        }else if(!sort && category && query){
            if(isAdmin === true){
                products = await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                    categories: {
                        $in: [category],
                    },
                });
            }
            else {
                products = await await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                    categories: {
                        $in: [category],
                    },
                    isActive: true
                });
            };
        }else if(sort && !category && !query){
            if(isAdmin === true){
                products = await Product.find().sort({ createdAt: sort });
            }
            else {
                products = await await Product.find({ 
                    isActive: true
                }).sort({ createdAt: sort });
            };
        }else if(!sort && !category && query){
            if(isAdmin === true){
                products = await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                });
            }
            else {
                products = await await Product.find({ 
                    name: { $regex: query, $options: "mi" },
                    isActive: true
                });
            };
        }else if(!sort && category && !query){
            if(isAdmin === true){
                products = await Product.find({ 
                    categories: {
                        $in: [category],
                    },
                });
            }
            else {
                products = await await Product.find({ 
                    categories: {
                        $in: [category],
                    },
                    isActive: true
                });
            };
        }else{
            if(isAdmin === true){
                products = await Product.find({});
            }
            else {
                products = await Product.find({ isActive: true });
            };
        }
        return res.status(200).json({
            success: true,
            products: products,
        })
    }catch(error){
        return res.status(400).json({
            error: error,
            success: false
        });
    };
};

