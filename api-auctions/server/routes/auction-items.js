const express = require('express');
const router = express.Router();
const controller = require("../controllers/auction-items-controller");


router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.createPost);

router.patch("/:id", controller.addPriceRequest)

module.exports = router;