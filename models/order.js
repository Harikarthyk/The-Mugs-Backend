const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: [true, "Please provide product name."],
            trim: true
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
            type: Boolean,
            default: true
        },
        coupon: {
            type: Boolean,
            default: true
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
            required:[true, "Please enter the phone number."]
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
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);