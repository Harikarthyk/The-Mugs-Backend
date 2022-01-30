const router = require("express").Router();
const { 
    getCartInfo,
    updateCart,
    adminCartInfo,
    applyCoupon,
    pushOrRemoveItemToCart
} = require("../controllers/cart");
const { 
    isSignedIn,
    customRoles 
} = require("../middleware/user");


router.get("/", isSignedIn, getCartInfo);
router.put("/", isSignedIn,  updateCart);
router.put("/coupon/:cartId", isSignedIn, applyCoupon);
router.put("/items", isSignedIn, pushOrRemoveItemToCart);

// admin routes 
router.post("/admin/:userId/",isSignedIn, customRoles("admin"), adminCartInfo);     


module.exports = router;