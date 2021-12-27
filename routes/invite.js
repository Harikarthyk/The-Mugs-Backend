const router = require("express").Router();
const { 
    createInvitation,
} = require("../controllers/invite");
const { 
    isSignedIn,
    customRoles
} = require("../middleware/user");


router.post("/create/admin/", createInvitation);


module.exports = router;