const express = require("express");
const router = express.Router();

const CompetenciasController = require("../Controllers/competenciasController");
const controller = new CompetenciasController();

router.get("/", controller.getCompetencias);
router.get("/:id", controller.getCompetenciaById);
router.post("/", controller.postCompetencia);
router.get("/:id/peliculas", controller.getPeliculasCompetencia);
router.post("/:id/voto", controller.postVoto);
router.get("/:id/resultados", controller.getResultados);
router.delete("/:id/votos", controller.resetVotos);
router.delete("/:id", controller.deleteCompetencia);

module.exports = router;