const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.isSignedIn = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(403).json({
                success: false,
                error: "Token is missing."
            });
        }

        const { JWT_SECRET } = process.env;

        const decode = jwt.verify(token, JWT_SECRET);

        const { id } = decode;

        const user = await User.findOne({ _id: id });
        req.user = user;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            error: error
        });
    }
}

exports.customRoles = (...roles) => {
    return (req, res, next) => {
       if (!roles.includes(req.user.role.toLowerCase())) {
            return res.status(403).json({
                success: false,
                error: "Access Denied."
            });
        }
        return next();
    }
}

exports.getUser = async(req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        
        if (!token) {
            req.user = null;
            return next();
        }

        const { JWT_SECRET } = process.env;

        const decode = jwt.verify(token, JWT_SECRET);

        const { id } = decode;

        const user = await User.findOne({ _id: id });
        req.user = user;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error: error.message || error
        });
    }
}