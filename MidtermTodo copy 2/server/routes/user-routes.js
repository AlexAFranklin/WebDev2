const express = require('express');
const router = express.Router();
const controller = require("../controllers/user-controller");
//const authenticate = require("../authentication/auth");
 
router.post("/register", controller.createUser);
router.post("/login", controller.login);
router.post("/findEmail", controller.findEmail);



module.exports = router;  