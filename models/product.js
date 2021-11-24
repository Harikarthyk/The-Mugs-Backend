const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide product name."],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Please provide product description."],
            maxlength: [250, "Description must be less than 250 characters."],
            trim: true
        },
        thumbnailImage: {
            type: String,
            required: [true, "Please provide the thumbnail Image."]
        },
        categories: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        sellingPrice: {
            type: Number,
            required: true
        },
        actualPrice: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        stock: {
            type: Number,
            default: 0
        },
        gallery: [{}],
        numberOfReviews:{
            type: Number,
            default:0
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);