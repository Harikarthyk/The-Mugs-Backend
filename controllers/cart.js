const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");

exports.getCartInfo = async(req, res) => {
    try{
        let cart = await Cart.findOne({ user: req.user._id, isActive: true }).populate("items.product");

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
            success: true,
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

        let cart = await Cart.findOneAndUpdate(
            { user: req.user._id, isActive: true },
            {
                $set: req.body
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            cart
        });

    }catch(error){
        return res.status(400).json({
            success: false,
            error: error?.message || error
        });
    }
}

exports.pushOrRemoveItemToCart = async(req, res) => {
    try{

        const { item, mode, price } = req.body;

        if(!item || !mode || !price){
            return res.status(400).json({
                success: false,
                error: "Cart items missing."
            });
        }

        let cart = await Cart.findOne(
            { user: req.user._id, isActive: true }, 
        );

        if(cart === null){
            cart = await Cart.create({
                user: req.user._id
            });
        }

            
        if(mode === "ADD"){
            let temp = [];
            let isFound = false;
            let subtotal = item.price * item.quantity;
            for(let i = 0 ; i < cart?.items?.length || 0; i++){
                let itr_item = cart.items[i];
                if(isFound === false && itr_item.product.toString() === item.product){
                    isFound = true;
                    itr_item.quantity = item.quantity;
                }else{
                    subtotal += (itr_item.price * itr_item.quantity);
                }
                temp.push(itr_item);
            }
            if(isFound === true){
                cart.items = temp;
                cart = await Cart.findOneAndUpdate(
                    { _id: cart._id },
                    { 
                        $set: {
                            subtotal: subtotal,
                            items: temp
                        } 
                    },
                    {
                        new: true
                    }
                );
                return res.status(200).json({
                    success: true,
                    cart
                });
            }
            
            cart = await Cart.findOneAndUpdate(
                { _id: cart._id }, 
                { 
                    $push: { items: item }, 
                    $set: { subtotal: subtotal } 
                }, 
                { new: true }
            );
        }else if(mode === "REMOVE"){
            cart = await Cart.findOneAndUpdate(
                { _id: cart._id }, 
                { 
                    $pull: { items: { product: item.product } }, 
                    $inc: { subtotal: -(price * item.quantity) } 
                }, 
                { new: true }
            );
        }


        return res.status(200).json({
            success: true,
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
            success: true,
            message: "success"
        });
        
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error || error?.message || "Something went wrong."
        });
    }
}