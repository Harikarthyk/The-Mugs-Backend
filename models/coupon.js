const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            require: [true]
        },
        name:{
            type: String,
            required: true,
            unique: true
        },
        discount:{
            type: String,
            required: [true, "Please enter the discount value."]
            // example: "10% 20"
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);