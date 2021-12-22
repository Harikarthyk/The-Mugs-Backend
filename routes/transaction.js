const express = require("express");
const { 
    createTransaction,
    updateTransaction,
    getAllTransaction
} = require("../controllers/transaction");
const { 
    isSignedIn, customRoles, 
} = require("../middleware/user");

const router = express.Router();


router.post("/", isSignedIn, createTransaction);
router.put("/:transactionId", isSignedIn, updateTransaction);
router.get("/admin", isSignedIn, customRoles("admin"), getAllTransaction);

module.exports = router;