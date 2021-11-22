const router = require("express").Router();
const { 
    createCategory,
    updateCategory, 
    deleteCategory,
    getCategories,
    getCategoryDetail
} = require("../controllers/category");
const { 
    isSignedIn,
    customRoles 
} = require("../middleware/user");


router.get("/:categoryId", getCategoryDetail);
router.get("/", getCategories);

// admin routes 
router.post("/admin/",isSignedIn, customRoles("admin"), createCategory);
router.put("/admin/:categoryId/", isSignedIn, customRoles("admin"), updateCategory);        
router.delete("/admin/:categoryId/:userId/", isSignedIn, customRoles("admin"), deleteCategory);


module.exports = router;