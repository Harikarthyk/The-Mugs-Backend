const { googleLogin, updateUser, getUser } = require("../controllers/user");
const { isSignedIn, isAuthorized } = require("../middleware/auth");
const User = require("../models/User");
const router = require("express").Router();

// //GET USER STATS

// router.get("/stats", async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try {
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 },
//                 },
//             },
//         ]);
//         res.status(200).json(data)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post('/auth',googleLogin);

router.put('/:userId', isSignedIn, isAuthorized, updateUser);

router.get('/:userId', isSignedIn, isAuthorized, getUser);

module.exports = router;