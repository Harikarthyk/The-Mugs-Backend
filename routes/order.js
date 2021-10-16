const { 
    createOrder,
    updateOrder,
    getAllOrders,
    getOrder,
    getUserOrders
} = require("../controllers/order");
const { isSignedIn, isAuthorized } = require("../middleware/auth");


const router = require("express").Router();

//CREATE

router.post("/:userId",isSignedIn,isAuthorized, createOrder);

//UPDATE
router.put("/:orderId/:userId", isSignedIn,isAuthorized, updateOrder);

//GET USER ORDERS
router.get("/:userId", isSignedIn, isAuthorized, getUserOrders);

// //GET ALL
router.get("/:orderId/:userId", isSignedIn, isAuthorized, getAllOrders);


// GET ORDER
router.get("/:orderId/:userId", isSignedIn, isAuthorized, getOrder);

// GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//     try {
//         const income = await Order.aggregate([
//             { $match: { createdAt: { $gte: previousMonth } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                     sales: "$amount",
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: "$sales" },
//                 },
//             },
//         ]);
//         res.status(200).json(income);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;