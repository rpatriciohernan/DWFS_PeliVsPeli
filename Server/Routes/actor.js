const express = require("express");
const router = express.Router();

const ActoresController = require("../Controllers/actoresController");
const controller = new ActoresController();

router.get("/", controller.getActores);

module.exports = router;