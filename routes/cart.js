const router = require("express").Router();
const { 
    getCartInfo,
    updateCart
} = require("../controllers/cart");
const { 
    isSignedIn,
    customRoles 
} = require("../middleware/user");


router.get("/", isSignedIn, getCartInfo);
router.put("/", isSignedIn,  updateCart);

// admin routes 
router.post("/admin/:userId/",isSignedIn, customRoles("admin"), adminCartInfo);     


module.exports = router;