const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
        
        email: {
            type: String,
            required: [true, "Please provide an email"],
        },
        role: {
            type: String,
            default: 'USER',
            enum: ["ADMIN", "STAFF", "USER"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Invite", InviteSchema);