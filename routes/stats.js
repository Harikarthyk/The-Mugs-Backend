const router = require("express").Router();
const { 
    dashBoardStats,
} = require("../controllers/stats");
const { 
    isSignedIn,
    customRoles 
} = require("../middleware/user");

// admin routes 
router.get("/admin",isSignedIn, customRoles("admin"), dashBoardStats);     


module.exports = router;