
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        },
        review: {
            type: String,
        },
        rating: {
            type: Number,
        },
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);