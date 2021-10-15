const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        img:{
            type:String,
            required:true
        },
        isActive:{
            type:Boolean,
            default: true,
        },
        isDeleted:{
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Banner", BannerSchema);