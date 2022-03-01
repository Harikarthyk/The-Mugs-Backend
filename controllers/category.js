const Category = require("../models/category");
const Product = require("../models/product");
const WhereClause = require("../utils/whereClause");

exports.createCategory = async(req, res) => {
    try{
        req.body["user"] = req.user._id;
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
        const { updateProductStatus } = req.body;
        const category = await Category.findByIdAndUpdate(
            { _id: categoryId },
            { $set : req.body },
            { new : true }
        );

        if(updateProductStatus === true){
            await Product.updateMany(
                { 
                    categories: categoryId,
                    isDeleted: false
                },
                {
                    $set:{ isActive: req.body.isActive }
                }
            );
        }

        return res.status(200).json({
            success: true,
            category,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        });
    };
};

exports.getCategories = async(req, res) => {
    try{
        const categoriesObj = new WhereClause(Category, req.query).search().filter();

        const availableCategories = await categoriesObj.base;

        const availableCategoriesCount = availableCategories.length;

        const { limit } = req.query;

        const RESULT_PER_PAGE = Number(limit) || 25;

        categoriesObj.pager(RESULT_PER_PAGE);

        const categories = await categoriesObj.base.clone().sort({ createdAt: -1 });

        const totalCategoriesCount = categories.length;

        return res.status(200).json({
            success: true,
            categories,
            totalCategoriesCount,
            availableCategoriesCount
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


exports.getCategoryDetail = async(req, res) => {
    try{
        const { categoryId } = req.params;
        const category = await Category.findOne({_id: categoryId});
        // const products = await  Product.find({$in: {categories: categoryId}} );
        const products = await  Product.find({categories: categoryId});
        return res.status(200).json({
            success: true,
            category: category,
            products: products
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    };
}