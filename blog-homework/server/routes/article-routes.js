const express = require('express');
const router = express.Router();
const controller = require("../controllers/article-controller");

router.post("/new", controller.createArticle);
router.get("/all", controller.viewAll);
router.get("/:id([0-9]+)", controller.viewOne);


module.exports = router;