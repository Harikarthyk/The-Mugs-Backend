const { 
    addProduct, 
    updateProduct, 
    getProduct, 
    getAllProduct,
    getAllProductAdmin
} = require("../controllers/product");
const { 
    isSignedIn, 
    isAuthorized,
    isAdmin 
} = require("../middleware/auth");
const router = require("express").Router();

router.post("/:userId", isSignedIn, isAuthorized, isAdmin, addProduct);

router.put("/:productId/:userId", isSignedIn, isAuthorized, isAdmin, updateProduct);

router.get("/:userId", getProduct);

router.get("/", getAllProduct);

router.get("/:userId", isSignedIn, isAuthorized, isAdmin, getAllProductAdmin);

module.exports = router;