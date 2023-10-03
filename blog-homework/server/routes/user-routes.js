const express = require('express');
const router = express.Router();
const controller = require("../controllers/user-controller");
const axios = require('axios');

axios.defaults.withCredentials = true;

router.post("/register", controller.createUser);
router.post("/username", controller.findUserName);
router.post("/email", controller.findEmail);
router.post("/login", controller.login);
router.get("/authenticated", controller.verifyJWT, controller.getAuth);
router.get("/login", controller.validateLogin)


module.exports = router;