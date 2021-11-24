const { 
    addReview, 
    updateReview, 
    getReview
} = require("../controllers/review");
const { 
    isSignedIn, 
    customRoles,
    getUser
} = require("../middleware/user");
const router = require("express").Router();

router.get("/", isSignedIn, addReview);

router.post("/:productId/", isSignedIn, updateReview);

router.put("/:reviewId/", isSignedIn, getReview);

module.exports = router;