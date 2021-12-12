const WhereClause = require("../utils/whereClause");
const Order = require("../models/order");

exports.createOrder = async(req, res) => {
    try{

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}

exports.updateOrder = async(req, res) => {
    try{

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}

exports.getOrder = async(req, res) => {
    try{

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}

exports.getAllOrders = async(req, res) => {
    try{

        const orderObj = new WhereClause(Order, req.query, req.user?.role).search().filter();

        const availableOrders = await orderObj.base;

        const availableOrdersCount = availableOrders.length;

        const { limit } = req.query;

        const RESULT_PER_PAGE = Number(limit) || 2;

        orderObj.pager(RESULT_PER_PAGE);

        const orders = await orderObj.base.clone();

        const totalOrdersCount = orders.length;

        return res.status(200).json({
            success: true,
            orders,
            availableOrdersCount,
            totalOrdersCount
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}