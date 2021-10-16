const { 
    addProduct, 
    updateProduct, 
    getProduct, 
    getAllProduct 
} = require("../controllers/product");
const { 
    isSignedIn, 
    isAuthorized 
} = require("../middleware/auth");
const router = require("express").Router();

router.post("/:userId", isSignedIn, isAuthorized, addProduct);

router.put("/:productId/:userId", isSignedIn, isAuthorized, updateProduct);

router.get("/productId/:userId", isSignedIn, isAuthorized, getProduct);

router.get("/:userId", isSignedIn, isAuthorized, getAllProduct);

module.exports = router;