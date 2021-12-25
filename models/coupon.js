const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            require: [true]
        },
        name:{
            type: String,
            required: true,
            unique: true
        },
        discount:{
            type: String,
            required: [true, "Please enter the discount value."]
            // example: "10% 20"
        },
        type:{
            type: String,
            required: [true, "Please enter the discount Type."],
            enum: ["FLAT", "PERCENTAGE"]
        },
        limit:{
            type: "String",
            required: [true, "Please enter coupon limit"],
            enum: [
                "UNLIMITED",
                "ONE_TIME_USER",
                "FIRST_ORDER",
                "ORDER_ABOVE_199",
                "ORDER_ABOVE_499",
                "ORDER_ABOVE_599",
                "EVERY_TIME",
                "OTHER"
            ]
        },
        count: {
            type: "String",
            required: [true, "Count is required."],
            default: 0
        },
        dateValid:{
            type: Date,
            required: [true, "Mention the Date"]
        },
        isActive:{
            type: Boolean,
            default: true
        },
        isDeleted:{
            type: Boolean,
            default: false
        },
        users:[{
            user: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User",
            },
            used: {
                type: Number,
                default: 1
            },
            order:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Order",
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);