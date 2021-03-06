const { cookieToken } = require("../utils/cookieToken");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const WhereClause = require("../utils/whereClause");
const Invite = require("../models/invite");

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
            return cookieToken({
                user: user,
                success: true,
                token: accessToken
            }, res);
            
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


exports.invitedAdminLogin = async(req, res) => {
    try{
        const { googleId } = req.body;
        const users = await User.find({googleId : googleId});
        const { JWT_SECRET } = process.env;
           
        if(users.length === 0){
            const { inviteId } = req.params;
            const invites = await Invite.findOne({ _id: inviteId, email: req.body.email });
            if(invites !== null){
                const user = await new User({
                    ...req.body, 
                    "role": invites.role || "USER"
                }).save();
                const accessToken = jwt.sign({
                        id: user._id,
                        isAdmin: user.role !== "USER" ? false : true,
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
        
            }
            
            
            return res.status(400).json({
                success: false,
                error: "No Admin Account Exists with this Id."
            });
            
        }
        
        const user = users[0];
        if(user.role === "USER"){
            return res.status(400).json({
                success: false,
                error: "No Admin Account Exists with this Id."
            });
        }
        const accessToken = jwt.sign({
            id: user._id,
                isAdmin: user.isAdmin,
            },
            JWT_SECRET,{
                expiresIn:"3d"
            }
        );
        user["token"] = accessToken;
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

exports.adminGoogleLogin = async(req, res) => {
    try{
        const { googleId } = req.body;
        const users = await User.find({googleId : googleId});
        const { JWT_SECRET } = process.env;
        if(users.length === 0){
            // const user = await new User(req.body).save();
            // const accessToken = jwt.sign({
            //         id: user._id,
            //         isAdmin: user.isAdmin,
            //     },
            //     JWT_SECRET,{
            //         expiresIn:"3d"
            //     }
            // );
            // return res.status(200).json({
            //     success: true,
            //     user: user,
            //     token: accessToken,
            // });
            
            return res.status(400).json({
                success: false,
                error: "No Admin Account Exists with this Id."
            });
            
        }
        
        const user = users[0];
        if(user.role === "USER"){
            return res.status(400).json({
                success: false,
                error: "No Admin Account Exists with this Id."
            });
        }
        const accessToken = jwt.sign({
            id: user._id,
                isAdmin: user.isAdmin,
            },
            JWT_SECRET,{
                expiresIn:"3d"
            }
        );
        user["token"] = accessToken;
        return cookieToken({
            user: user,
            success: true,
            token: accessToken
        }, res);

    }catch(error){
        // console.log(error)
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

        const users = await userObj.base.clone().sort({createdAt: -1});

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

exports.adminUpdateUserInfo = async(req, res) => {
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

exports.adminUserStats = async(req, res) => {
    try{
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        const monthStrings = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        
        const data = await User.aggregate([
            {
                $match: { 
                    createdAt: { 
                        $gte: lastYear 
                    } 
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    count: {
                        $sum: 1
                    }
                }
              },
              {
                $project: {
                  _id: "$_id.month",
                  name:{
                    $concat: [ 
                        {$arrayElemAt: [
                            monthStrings,
                            "$_id.month"
                        ]},
                        " ",
                        {$toString: "$_id.year"}
                    ]           
                  },
                  year:"$_id.year",
                  month: "$_id.month",
                  "Active User":"$count", 
                  count: 1,
                }
              },
              { $sort : { year : 1, month: 1 } }
        ]);
        const preYear = data[0]?.month  === 1 ? data[0]?.year - 1 : data[0]?.year || 2001;
        const preMonthIndex = data[0]?.month  === 1 ? 12 : data[0]?.month - 1|| 1;
        data.unshift({
            "count": 0,
            "_id": data[0]?._id - 1 || 1,
            "name": `${monthStrings[preMonthIndex]} ${preYear}`,
            "Active User": 0,
            year: preYear,
            month: preMonthIndex
        });

        // data.unshift({
        //     "count": 0,
        //     "_id": data[0]?._id - 2 || 1,
        //     "name": monthStrings[data[0]?._id - 2 || 1],
        //     "Active User": 0 
        // });
        return res.status(200).json({
            data,
            success: true
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message || error
        })
    }
}