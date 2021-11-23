const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        subtotal:{
            type:Number,
            required:true
        },
        coupon:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Coupon"
        },
        isActive:{
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);