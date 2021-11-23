const Cart = require("../models/cart");

exports.getCart = async(req, res) => {
    try{
        let cart = await Cart.findOne({ user: req.user._id, isActive: true });

        if(cart === null){
            cart = await Cart.create({
                user: req.user._id
            });
            return res.status(201).json({
                success: false,
                cart
            });
        }

        return res.status(200).json({
            success: false,
            cart
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error?.message || error
        });
    }
}

exports.updateCart = async(req, res) => {
    try{

        const { item, subtotal } = req.body;

        if(!item || !subtotal){
            return res.status(400).json({
                success: false,
                error: "Cart items missing."
            });
        }

        
        let cart = await Cart.findOneAndUpdate(
            { user: req.user._id, isActive: true }, 
            { 
                $push: { items: item }, 
                $set: { $inc: { subtotal: total } } 
            }, 
            { new: true}
        );

        if(cart === null){
            cart = await Cart.create({
                user: req.user._id,
                items: [item],
                total
            });

            return res.status(201).json({
                success: true,
                cart: cart
            })
        }
        

        return res.status(200).json({
            success: false,
            cart
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error?.message || error
        });
    }
}