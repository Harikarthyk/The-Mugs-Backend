const Banner = require("../models/banner");
const WhereClause = require("../utils/whereClause");
exports.createBanner = async(req, res) => {
    try{
        const banner = Banner.create(req.body);
        return res.status(201).json({
            success: true,
            banner
        });
    }catch(error){
        return res.status(400).json({
            error: error.message || error,
            success: false
        });
    }
}

exports.updateBanner = async(req, res) => {
    try{
        const { bannerId } = req.params;
        const banner = await Banner.findByIdAndUpdate(
            { _id: bannerId },
            { $set : req.body },
            { new : true }
        );
        return res.status(200).json({
            success: true,
            banner
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        });
    };
}

exports.getBannerProducts = async(req, res) => {
    try{
        const { bannerId } = req.params;
        const banner = await Banner.findOne(
            { _id: bannerId },
        ).populate("products");

        return res.status(200).json({
            success: true,
            banner
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        });
    }
}

exports.getBanners = async(req, res) => {
    try{
        const bannerObj = new WhereClause(Banner, req.query).search().filter();
        
        const availableBanners = await bannerObj.base;

        const availableBannersCount = availableBanners.length;

        const { limit } = req.query;

        const RESULT_PER_PAGE = Number(limit) || 25;

        bannerObj.pager(RESULT_PER_PAGE);

        const banners = await bannerObj.base.clone();

        const totalBannersCount = banners.length;

        return res.status(200).json({
            success: true,
            banners,
            availableBannersCount,
            totalBannersCount,
        });
        
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error
        })
    };
}