const Order = require("../models/Order");

exports.createOrder = async(req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        return res.status(200).json({
            success: true,
            order: savedOrder
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
};

exports.updateOrder = async(req, res) => {
    try{
        const { orderId } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            order: updatedOrder
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
}

exports.getAllOrders = async(req, res) => {
    try{
        const orders = await Order.find();
        return res.status(200).json({
            success: true,
            orders: orders
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
};

exports.getOrder = async(req, res) => {
    try{
        const { orderId } = req.params;
        const orders = await Order.findById(orderId);
        return res.status(200).json({
            success: true,
            order: order
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
};

exports.getUserOrders = async(req, res) => {
    try{
        const { userId } = req.params;
        const orders = await Order.find({ user : userId });
        return res.status(200).json({
            success: true,
            orders: orders
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
};