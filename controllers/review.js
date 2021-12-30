const Product = require("../models/product");
const Review = require("../models/review");
const WhereClause = require("../utils/whereClause");

exports.addReview = async(req, res) => {
    try{
        const review = await Review.create(req.body);

        Product.findOneAndUpdate({ _id: req.body.product }, { $inc: { "noOfReviews" : 1 } });
        
        return res.status(201).json({
            success: true,
            review
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    }
}

exports.updateReview = async(req, res) => {
    try{

        const { reviewId } = req.params;

        const review = await Review.findOneAndUpdate(
            {
                _id: reviewId,
            },
            {
                $set: req.body
            }
        );

        return res.status(201).json({
            success: true,
            review
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    }
}

exports.getReview = async(req, res) => {
    try{

        const reviewsObj = new WhereClause(Review, req.query, req.user.role);

        const totalReviews = await reviewsObj.base;

        const totalReviewsCount = totalReviews.length;

        reviewsObj = reviewsObj.pager(10);

        const reviews = await reviewsObj.base;

        const reviewsCount = await reviews.length;

        return res.status(200).json({
            success: true,
            reviews,
            totalReviewsCount,
            reviewsCount
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        })
    }
}
