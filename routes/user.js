const express = require("express");
const { 
    googleLogin,
    userInfo,
    adminAllUser,
    adminGetUserInfo,
    adminUpdateUserInfo,
    adminUserStats,
    adminGoogleLogin,
    invitedAdminLogin
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
router.post("/invite/admin/google/:inviteId", invitedAdminLogin);
router.get("/admin/users", isSignedIn, customRoles("admin"), adminAllUser);
router.get("/admin/stats", isSignedIn,  adminUserStats);
router.get("/admin/:userId", isSignedIn, customRoles("admin"), adminGetUserInfo);
router.put("/admin/:userId", isSignedIn, customRoles("admin"), adminUpdateUserInfo);

module.exports = router;