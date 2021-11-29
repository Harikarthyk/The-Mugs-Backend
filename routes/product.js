const { 
    addProduct, 
    updateProduct, 
    getProduct, 
    getAllProduct,
} = require("../controllers/product");
const { 
    isSignedIn, 
    customRoles,
    getUser
} = require("../middleware/user");
const router = require("express").Router();

// admin routes
router.post("/admin/", isSignedIn, customRoles("admin"), addProduct);
router.put("/admin/:productId/", isSignedIn, customRoles("admin"), updateProduct);
router.delete("/admin/:productId", isSignedIn, customRoles("admin"), updateProduct);


router.get("/:productId/", getProduct); 
router.get("/", getUser, getAllProduct);

module.exports = router;