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
            }
        }],
        notes:[],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);