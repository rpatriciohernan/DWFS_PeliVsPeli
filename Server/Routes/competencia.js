const express = require("express");
const router = express.Router();

const CompetenciasController = require("../Controllers/competenciasController");
const controller = new CompetenciasController();

router.get("/", controller.getCompetencias);
router.get("/:id/peliculas", controller.getOpciones);
router.post("/:id/voto", controller.postVoto);
router.get("/:id/resultados", controller.getResultados);
module.exports = router;