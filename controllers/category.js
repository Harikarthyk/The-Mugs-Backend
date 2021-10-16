const Category = require("../models/category")

exports.createCategory = async(req, res) => {
    try{
        const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();
        return res.status(200).json({
            success: true,
            category: savedCategory,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        });
    };
};


exports.updateCategory = async(req, res) => {
    try{
        const { categoryId } = req.params;
        const category = await Category.findByIdAndUpdate(
            categoryId,
            { $set : req.body },
            { new : true }
        );
        return res.status(200).json({
            success: true,
            category: category,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        });
    };
};

exports.getAllCategories = async(req, res) => {
    try{
        const categories = await Category.find();
        return res.status(200).json({
            success: true,
            categories: categories,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    };
};

exports.deleteCategory = async(req, res) => {
    try{
        const { categoryId } = req.params;
        await Category.deleteOne({ _id : categoryId});
        return res.status(200).json({
            success: true,
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    };
};
