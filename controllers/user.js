const User = require("../models/User");
const jwt = require('jsonwebtoken');

exports.googleLogin = async(req, res) => {
    try{
        const { googleId } = req.body;
        const users = await User.find({googleId : googleId});
        if(users.length === 0){
            const user = await new User(req.body).save();
            const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,{
                    expiresIn:"3d"
                }
            );
            return res.status(200).json({
                success: true,
                user: user,
                token: accessToken,
            });
            
        }
        
        const user = users[0];
        const accessToken = jwt.sign({
            id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,{
                expiresIn:"3d"
            }
        );
        return res.status(200).json({
                success: true,
                user: user,
                token: accessToken,
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
};

exports.getUser = async(req, res) => {
    try{
        const { id } = req.user;
        const user = await User.findOne({_id : id});
        return res.status(200).json({
            success: true,
            user: user,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
}

exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users: users,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
}

exports.updateUser = async(req, res) => {
    try{
        const { id } = req.user;
        const user = await User.findOneAndUpdate({_id: id}, { $set : req.body });
        return res.status(200).json({
            success: true,
            user: user,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            error: error,
        });
    }
}