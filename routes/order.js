const router = require("express").Router();
const { 
    createOrder,
    getAllOrders,
    updateOrder,
    getOrder
} = require("../controllers/order");
const { 
    isSignedIn, customRoles,
} = require("../middleware/user");


router.get("/:orderId", isSignedIn, getOrder);
router.get("/", isSignedIn,  getAllOrders);
router.post("/", isSignedIn, createOrder);
router.put("/:orderId", isSignedIn, updateOrder);


module.exports = router;