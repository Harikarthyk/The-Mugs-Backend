const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        amount:{
            type:Number,
            required: [true, "Enter total Amount."]
        },
        amountPaid:{
            type:Number,
            default: 0
        },
        receipt:{
            type: String,
            required: [true, "Receipt Number required ."]
        },
        currency:{
            type: String,
            default: "INR"
        },
        status: {
            type: String,
            required: [true, "Status missing."]
        },
        created_at:{
            type: Date,
            required: [true, "Date mentioned ."]
        }
    },
);

module.exports = mongoose.model("Transaction", TransactionSchema);