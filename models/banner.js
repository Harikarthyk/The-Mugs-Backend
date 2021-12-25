const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        bannerImage:{
            type: String,
            required: [true, "Banner Image is Required ."]
        },
        bannerHeading:{
            type: String,
            trim: true
        },
        bannerCaption:{
            type: String,
            trim: true
        },
        products: [
         {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
        },
        ],
        isActive:{
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Banner", BannerSchema);