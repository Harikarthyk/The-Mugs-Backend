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
} = require("../middleware/auth");
const router = require("express").Router();

router.post("/admin/", isSignedIn, customRoles("admin"), addProduct);
router.put("/admin/:productId/", isSignedIn, customRoles("admin"), updateProduct);

router.get("/:productId/", getProduct); 
router.get("/", getAllProduct);

router.get("/:userId", isSignedIn, isAuthorized, isAdmin, getAllProductAdmin);


module.exports = router;