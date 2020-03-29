const express = require("express");
const router = express.Router();

const actoresRoutes = require("./Routes/actor");
const generosRoutes = require("./Routes/genero");
const directoresRoutes = require("./Routes/director");
const competenciasRoutes = require("./Routes/competencia");

router.use("/actores", actoresRoutes);
router.use("/generos", generosRoutes);
router.use("/directores", directoresRoutes);
router.use("/competencias", competenciasRoutes);

module.exports = router;