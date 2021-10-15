const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        name: {
            type: String,
            required: true
        },
        googleId: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        mobile:{
            type:String
        },
        defaultAddress:{
            type: Object
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);