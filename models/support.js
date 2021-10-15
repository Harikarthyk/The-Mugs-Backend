const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        title:{
            type: String,
            required: true,
            unique: true
        },
        messages:[
            {
                message : String,
                user:{
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "User",
                },
                images:[],
            }
        ],
        isDeleted:{
            type:Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Support", SupportSchema);