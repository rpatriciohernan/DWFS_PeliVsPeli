const express = require("express");
const router = express.Router();

const GenerosController = require("../Controllers/generosController");
const controller = new GenerosController();

router.get("/", controller.getGeneros);

module.exports = router;