const router = require("express").Router();
const { 
    createBanner,
    updateBanner, 
    // deleteBanner,
    getBanners,
    getBannerProducts
} = require("../controllers/banner");
const { 
    isSignedIn,
    customRoles 
} = require("../middleware/user");


router.get("/:bannerId", getBannerProducts);
router.get("/", getBanners);

// admin routes 
router.post("/admin/",isSignedIn, customRoles("admin"), createBanner);
router.put("/admin/:bannerId/", isSignedIn, customRoles("admin"), updateBanner);        
// router.delete("/admin/:bannerId/:userId/", isSignedIn, customRoles("admin"), deleteBanner);


module.exports = router;