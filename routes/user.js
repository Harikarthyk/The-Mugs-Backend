const express = require("express");
const { 
    googleLogin,
    userInfo,
    adminAllUser,
    adminGetUserInfo,
    adminUpdateUserInfo,
    adminUserStats
} = require("../controllers/user");
const { 
    isSignedIn, 
    customRoles 
} = require("../middleware/user");
const router = express.Router();

router.post("/google", googleLogin);
router.get("/", isSignedIn, userInfo);

//admin routes

router.get("/admin/users", isSignedIn, customRoles("admin"), adminAllUser);
router.get("/admin/stats", adminUserStats);
router.get("/admin/:userId", isSignedIn, customRoles("admin"), adminGetUserInfo);
router.put("/admin/:userId", isSignedIn, customRoles("admin"), adminUpdateUserInfo);

module.exports = router;