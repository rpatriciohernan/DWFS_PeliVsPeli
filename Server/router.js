const express = require("express");
const router = express.Router();

const actoresRoutes = require("./Routes/actor");
const competenciasRoutes = require("./Routes/competencia");

router.use("/actores", actoresRoutes);
router.use("/competencias", competenciasRoutes);

module.exports = router;