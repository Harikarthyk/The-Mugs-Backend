const Cart = require("../models/Cart");

exports.addToCart = async(req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        return res.status(200).json({
            success: true,
            cart: savedCart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }
};

exports.updateCart = async(req, res) => {
    try {
        const { cartId } = req.params;
        const updatedCart = await Cart.findOneAndUpdate(
            { _id : cartId },
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            cart: updatedCart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }
};

exports.deleteCart = async(req, res) => {
    try{
        const { cartId } = req.params;
        await Cart.findByIdAndDelete(cartId);
        return res.status(200).json({
            success: true,
            message: "Cart deleted"
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error
        });
    }
};

exports.getCart = async(req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({user : userId});
        return res.status(200).json({
            success: true,
            cart: cart
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }
};

exports.getAllCart = async(req, res) => {
    try{
        const carts = await Cart.find();
        return res.status(200).json({
            success: true,
            carts: carts
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error
        });
    };
}