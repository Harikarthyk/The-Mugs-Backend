const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
        
        email: {
            type: String,
            required: [true, "Please provide an email"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Invite", InviteSchema);