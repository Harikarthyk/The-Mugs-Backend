const Coupon = require("../models/coupon");
const WhereClause = require("../utils/whereClause");

exports.addCoupon = async(req, res) => {
    try{
        
        const coupon = await Coupon.create(req.body);

        return res.status(201).json({
            success: true,
            coupon: coupon
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error?.message || error
        });
    }
}

exports.getCoupon = async(req, res) => {
    try{

        const { couponId } = req.params;

        const coupon = await Coupon.findOne(couponId);

        return res.status(200).json({
            success: true,
            coupon: coupon
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error?.message || error
        });
    }
}

exports.getAllCoupon = async(req, res) => {
    try{

        const couponObj = new WhereClause(Coupon, req.query, req.user.role).search().filter();

        const coupons = await couponObj.base;

        return res.status(200).json({
            success: true,
            coupons
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error?.message || error
        });
    }
}

exports.updateCoupon = async(req, res) => {
    try{
        const coupon = await Coupon.findOneAndUpdate(
            {
                _id: couponId,
            },
            {
                $set: req.body
            }
        );

        return res.status(200).json({
            success: true,
            coupon
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}

exports.deleteCoupon = async(req, res) => {
    try{
        const coupon = await Coupon.findOneAndUpdate(
            {
                _id: couponId,
            },
            {
                $set: { isDeleted: true, isActive: false }
            }
        );

        return res.status(200).json({
            success: true,
            coupon
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}