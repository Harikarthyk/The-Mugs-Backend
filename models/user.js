const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");   
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        email: { 
            type: String, 
            required: [true, "Please provide an email."], 
            unique: [true, "Email is already registered."],
            validate: [validator.isEmail, "Please enter email in correct format."]
        },
        name: {
            type: String,
            required: [true, "Please provide name."],
            maxlength: [40, "Name should be under 40 Characters."]
        },
        password: { 
            type: String,
            select: false,
            required: [false]
        },
        googleId: {
            type: String,
        },
        role: {
            type: String,
            default: 'USER',
            enum: ["ADMIN", "STAFF", "USER"]
        },
        mobile:{
            type:String,
            minlength: [10, "Invalid Mobile Number Entered."]
        },
        avatar: {
            id: {
                type: String,
            },
            url: {
                type: String,
            }
        },
        defaultAddress:{
            type: Object
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function(next){
    if(this.isModified(this.password) === true){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.validatePassword = async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword, this.password);
};

userSchema.methods.getJwtToken = async function(){

    const { JWT_EXPIRY, JWT_SECRET_KEY } = process.env;

    return jwt.sign(
        {
            _id: this._id
        },
        JWT_SECRET_KEY,
        {
            expiresIn: JWT_EXPIRY
        }
    );
};




module.exports = mongoose.model("User", userSchema);