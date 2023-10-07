const express = require('express');
const router = express.Router();
const controller = require("../controllers/article-controller");
const Authenticate = require("../Authentication/AuthMiddleware")


router.post("/new", Authenticate, controller.createArticle);
router.get("/all", controller.viewAll);
router.get("/:id([0-9]+)", controller.viewOne);


module.exports = router;