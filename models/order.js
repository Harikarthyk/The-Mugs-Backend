const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        products: [
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
        amount: { 
            type: Number, 
            required: true 
        },
        address: { 
            type: Object, 
            required: true 
        },
        status: { 
            type: String, 
            enum : ['NEW', 'PROCESSING', 'PENDING', 'PACKED', 'DELIVERED'],
            default: "NEW" 
        },
        transaction:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Transaction",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);