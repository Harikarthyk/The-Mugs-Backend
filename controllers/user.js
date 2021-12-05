const { cookieToken } = require("../utils/cookieToken");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const WhereClause = require("../utils/whereClause");

exports.googleLogin = async(req, res) => {
    try{
        const { googleId } = req.body;
        const users = await User.find({googleId : googleId});
        const { JWT_SECRET } = process.env;
           
        if(users.length === 0){
            const user = await new User(req.body).save();
            const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                JWT_SECRET,{
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
            JWT_SECRET,{
                expiresIn:"3d"
            }
        );
        
        return cookieToken({
            user: user,
            success: true,
            token: accessToken
        }, res);

    }catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            error: error?.message || error,
        });
    }
}

exports.userInfo = async(req, res) => {
    try{
        
        const user = await User.findOne({ _id: req.user._id });
        
        return res.status(200).json({
            success: true,
            user: user
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error
        });
    }
}

exports.adminAllUser = async(req, res) => {
    try{

        const userObj = new WhereClause(User, req.query, req.user?.role).search().filter();

        const availableUser = await userObj.base;

        const availableUserCount = availableUser.length;

        const { limit } = req.query;

        const RESULT_PER_PAGE = Number(limit) || 2;

        userObj.pager(RESULT_PER_PAGE);

        const users = await userObj.base.clone();

        const totalUserCount = users.length;

        return res.status(200).json({
            success: true,
            totalUserCount,
            users,
            availableUserCount
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error
        });
    }
}

exports.adminGetUserInfo = async(req, res) => {
    try{
        
        const { userId } = req.params;

        if(!userId){
            return res.status(400).json({
                success: false,
                error: "User not found."
            })
        }

        const user = await User.findOne({ _id: userId });
        
        return res.status(200).json({
            success: true,
            user: user
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error
        });
    }
}

exports.adminUpdateUserInfo = async(req, re) => {
    try{
        
        const { userId } = req.params;

        if(!userId){
            return res.status(400).json({
                success: false,
                error: "User not found."
            })
        }

        const user = await User.findOneAndUpdate({ _id: userId },{ $set: req.body }, { new : true, runValidators: true });
        
        return res.status(200).json({
            success: true,
            user: user
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error
        });
    }
}