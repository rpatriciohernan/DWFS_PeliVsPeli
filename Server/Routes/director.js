const express = require("express");
const router = express.Router();

const DirectoresController = require("../Controllers/directoresController");
const controller = new DirectoresController();

router.get("/", controller.getDirectores);

module.exports = router;