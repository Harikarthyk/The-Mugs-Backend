const router = require("express").Router();
const { 
    addCoupon,
    updateCoupon, 
    getCoupon,
    getAllCoupon,
    deleteCoupon
} = require("../controllers/coupon");
const { 
    isSignedIn,
    customRoles 
} = require("../middleware/user");


router.get("/:couponId", getCoupon);
router.get("/", getAllCoupon);

// admin routes 
router.post("/admin/",isSignedIn, customRoles("admin"), addCoupon);
router.put("/admin/:couponId/", isSignedIn, customRoles("admin"), updateCoupon);        
router.delete("/admin/:couponId", isSignedIn, customRoles("admin"), deleteCoupon);


module.exports = router;