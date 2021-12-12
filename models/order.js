const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: [true, "Please provide order Number."],
            trim: true,
            unique: [true, "Please Provide a unique order Number."]
        },
        subtotal: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        },
        discount:{
            type: Number,
            default: 0
        },
        couponCode: {
            type: String,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        items:[{
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 0
            },
            image:{
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            }
        }],
        phone:{
            type: String,
            required:[true, "Please enter the phone number."],
            trim: true
        },
        notes:[],
        shippingAddress:{
            line1: {
                type: String,
                required:[true, "Please enter the address line1 ."],
                trim: true
            },
            line2: {
                type: String,
                trim: true,
            },
            pinCode:{
                type: String,
                trim: true,
                maxlength: [6, "Please enter valid pin code ."],
                minlength: [4, "Please enter valid pin code ."],
            },
            city:{
                type: String,
                trim: true,
                maxlength: [40, "Please enter valid city ."],
                minlength: [2, "Please enter valid city ."],
            },
            state:{
                type: String,
                trim: true,
                maxlength: [40, "Please enter valid state ."],
                minlength: [2, "Please enter valid state ."],
            },
            country:{
                type: String,
                default: "India",
            }
        },
        billingAddress: {
            line1: {
                type: String,
                required:[true, "Please enter the address line1 ."],
                trim: true
            },
            line2: {
                type: String,
                trim: true,
            },
            pinCode:{
                type: String,
                trim: true,
                maxlength: [6, "Please enter valid pin code ."],
                minlength: [4, "Please enter valid pin code ."],
            },
            city:{
                type: String,
                trim: true,
                maxlength: [40, "Please enter valid city ."],
                minlength: [2, "Please enter valid city ."],
            },
            state:{
                type: String,
                trim: true,
                maxlength: [40, "Please enter valid state ."],
                minlength: [2, "Please enter valid state ."],
            },
            country:{
                type: String,
                default: "India",
            }
        },
        status: {
            type: String,
            default: "PROCESSING",
            enum: [
                "NEW",
                "PROCESSING",
                "HOLD",
                "COMPLETED",
                "DECLINED"
            ]
        },
        isDelivered:{
            type: Boolean,
            default: false
        },
        deliveredDate:{
            type: Date,
        },
        shippingAmount:{
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            require: [true, "Please Choose the payment method ."],
            enum: [
                "COD",
                "CREDIT CARD",
                "DEBIT CART",
                "UPI",
                "NET BANKING",
                "OTHER"
            ]
        },
        paymentInfo:{
            type: String,
        },
        transaction:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Transaction",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);