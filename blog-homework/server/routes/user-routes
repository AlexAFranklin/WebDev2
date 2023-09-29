const express = require('express');
const router = express.Router();
const controller = require("../controllers/user-controller");

router.post("/register", controller.createUser);
router.post("/username", controller.findUserName);
router.post("/email", controller.findEmail);
router.post("/login", controller.login);


module.exports = router;