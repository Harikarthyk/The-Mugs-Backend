const express = require("express");
const { 
    googleLogin,
    userInfo,
    adminAllUser,
    adminGetUserInfo,
    adminUpdateUserInfo,
    adminUserStats,
    adminGoogleLogin
} = require("../controllers/user");
const { 
    isSignedIn, 
    customRoles 
} = require("../middleware/user");
const router = express.Router();

router.post("/google", googleLogin);
router.get("/", isSignedIn, userInfo);

//admin routes
router.post("/admin/google", adminGoogleLogin);
router.get("/admin/users", isSignedIn, customRoles("admin"), adminAllUser);
router.get("/admin/stats", isSignedIn, customRoles("admin"), adminUserStats);
router.get("/admin/:userId", isSignedIn, customRoles("admin"), adminGetUserInfo);
router.put("/admin/:userId", isSignedIn, customRoles("admin"), adminUpdateUserInfo);

module.exports = router;