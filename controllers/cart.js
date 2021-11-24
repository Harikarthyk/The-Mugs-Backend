const Cart = require("../models/cart");

exports.getCartInfo = async(req, res) => {
    try{
        let cart = await Cart.findOne({ user: req.user._id, isActive: true });

        if(cart === null){
            cart = await Cart.create({
                user: req.user._id,
            });
            return res.status(201).json({
                success: false,
                cart,
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

        const { items, subtotal } = req.body;

        if(!items || !subtotal){
            return res.status(400).json({
                success: false,
                error: "Cart items missing."
            });
        }

        let cart = await Cart.findOneAndUpdate(
            { user: req.user._id, isActive: true },
            {
                $set: req.body
            },
            { new: true }
        );


        // let cart = await Cart.findOneAndUpdate(
        //     { user: req.user._id, isActive: true, "items.product": item.product }, 
        //     { 
        //         $push: { items: item }, 
        //         $inc: { subtotal: subtotal } 
        //     }, 
        //     { new: true}
        // );

        // if(cart === null){
        //     cart = await Cart.findOneAndUpdate(
        //         { user: req.user._id, isActive: true }, 
        //         { 
        //             $push: { items: item }, 
        //             $inc: { subtotal: subtotal } 
        //         }, 
        //         { new: true}
        //     );

        //     if(cart === null){
        //         cart = await Cart.create({
        //             user: req.user._id,
        //             items: [item],
        //             subtotal
        //         });
        //     }
            
        //     return res.status(201).json({
        //         success: true,
        //         cart: cart
        //     })
        // }
        

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

exports.adminCartInfo = async(req, res) => {
    try{

        const { userId } = req.params;

        let cart = await Cart.findOne({ user: userId, isActive: true });

        if(cart === null){
            cart = await Cart.create({
                user: userId
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