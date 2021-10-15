const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        product:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product",
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        review:{
            type: String,
            required: true,
        },
        photos:[],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ReviewSchema);