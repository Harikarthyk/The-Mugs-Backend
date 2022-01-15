const router = require("express").Router();
const { 
    getCartInfo,
    updateCart,
    adminCartInfo,
    applyCoupon
} = require("../controllers/cart");
const { 
    isSignedIn,
    customRoles 
} = require("../middleware/user");


router.get("/", isSignedIn, getCartInfo);
router.put("/", isSignedIn,  updateCart);
router.put("/coupon", isSignedIn, applyCoupon);

// admin routes 
router.post("/admin/:userId/",isSignedIn, customRoles("admin"), adminCartInfo);     


module.exports = router;