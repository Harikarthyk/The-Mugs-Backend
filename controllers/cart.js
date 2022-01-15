const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");

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

exports.applyCoupon = async(req, res) => {
    try{
        const { cartId } = req.params;
        const { name, total } = req.body;
        const coupon = await Coupon.findOne({ name });
        if(coupon === null){
            return res.status(400).json({
                success: false,
                error: "Coupon In valid."
            });
        };
        const { limit, minAmount } = coupon;

        if( total < minAmount ){
            return res.status(400).json({
                success: false,
                error: "Coupon In valid."
            });
        }


        for(let i = 0; i < limit.length; i++){
            const curr = limit[i];
            if(curr === "UNLIMITED"){
                continue;
            }else if(curr === "ONE_TIME_USER"){
                const { users } = coupon;
                for(let user in users){
                    if(user.user.toString() === req.user._id.toString()){
                        return res.status(400).json({
                            success: false,
                            error: "Coupon Already used."
                        });
                    }
                }
            }else if(curr === "FIRST_ORDER"){
                const orders = await Order.find({ user: req.user._id });
                if(orders.length > 0){
                    return res.status(400).json({
                        success: false,
                        error: "Coupon Not Applicable."
                    });
                }
            }   
        }

        await Coupon.findOneAndUpdate(
            { _id: coupon._id },
            {
                $set: updatedCoupon
            }
        );

        await Cart.findOneAndUpdate({ _id: cartId }, {
            $set: {
                coupon: name
            }
        });

        return res.status(200).json({
            success: false,
            message: "success"
        });
        
    }catch(error){

    }
}