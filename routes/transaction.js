const express = require("express");
const { 
    createTransaction,
    updateTransaction
} = require("../controllers/transaction");
const { 
    isSignedIn, 
} = require("../middleware/user");

const router = express.Router();


router.post("/", isSignedIn, createTransaction);
router.put("/:transactionId", isSignedIn, updateTransaction);

module.exports = router;