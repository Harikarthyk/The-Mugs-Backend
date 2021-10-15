const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
        },
        description: { 
            type: String, 
            required: true, 
        },
        thumbnailImage: { 
            type: String, 
            required: true 
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }],
        sellingPrice: { 
            type: Number, 
            required: true 
        },
        actualPrice:{
            type: Number, 
            required: true 
        },
        isActive:{
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        stock:{
            type: Number,
            default: 0
        },
        color:{
            type: String,
        },
        size:{
            type:String
        },
        gallery:[],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);