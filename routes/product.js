const { 
    addProduct, 
    updateProduct, 
    getProduct, 
    getAllProduct,
    deleteProduct
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
router.delete("/admin/:productId", isSignedIn, customRoles("admin"), deleteProduct);


router.get("/:productId/", getProduct); 
router.get("/", getAllProduct);

module.exports = router;