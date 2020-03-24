const express = require("express");
const router = express.Router();

const actoresRoutes = require("./Routes/actor");

router.use("/actores", actoresRoutes);

module.exports = router;