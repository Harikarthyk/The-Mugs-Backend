const { 
    addProduct, 
    updateProduct, 
    getProduct, 
    getAllProduct,
    getAllProductAdmin
} = require("../controllers/product");
const { 
    isSignedIn, 
    customRoles
} = require("../middleware/user");
const router = require("express").Router();

// admin routes
router.post("/admin/", isSignedIn, customRoles("admin"), addProduct);
router.put("/admin/:productId/", isSignedIn, customRoles("admin"), updateProduct);


router.get("/:productId/", getProduct); 
router.get("/", getAllProduct);

module.exports = router;