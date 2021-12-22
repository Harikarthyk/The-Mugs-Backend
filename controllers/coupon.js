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

        const couponsObj = new WhereClause(Coupon, req.query).search().filter();

        const availableCoupons = await couponsObj.base;

        const availableCouponsCount = availableCoupons.length;

        const { limit } = req.query;

        const RESULT_PER_PAGE = Number(limit) || 25;

        couponsObj.pager(RESULT_PER_PAGE);

        const coupons = await couponsObj.base.clone();

        const totalCouponsCount = coupons.length;

        return res.status(200).json({
            success: true,
            coupons,
            totalCouponsCount,
            availableCouponsCount
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