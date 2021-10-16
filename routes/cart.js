const { 
    addToCart, 
    deleteCart, 
    updateCart,
    getCart,
    getAllCart
} = require("../controllers/cart");
const { 
    isSignedIn, 
    isAuthorized, 
    isAdmin
} = require("../middleware/auth");
const router = require("express").Router();

/**
 * Route Serving Add Items to Cart
 * @name get/
 * @param {Object} req.body - cartItems
 * @description Add Items to Users Cart
 */
router.post("/", isSignedIn, isAuthorized, addToCart);


/**
 * Route Serving Update Cart
 * @name put/:cartId
 * @param {Object} req.body - cartItems
 * @description Update Items in Users Cart
 */
router.put("/:cartId", isSignedIn, isAuthorized, updateCart);


/**
 * Route Serving Delete Cart
 * @name delete/:cartId
 * @param 
 * @description Delete Cart
 */
router.delete("/:cartId", isSignedIn, isAuthorized, deleteCart);



/**
 * Route Serving Get Cart Items
 * @name get/:userId
 * @param {_id} req.params - userId
 * @description Get Cart Items 
 */
router.get("/:userId", isSignedIn, isAuthorized, getCart);


/**
 * Route Serving get All Cart Items
 * @name get/
 * @param 
 * @description Get All Cart Items
 */
router.get("/", isSignedIn, isAuthorized, isAdmin, getAllCart);

module.exports = router;