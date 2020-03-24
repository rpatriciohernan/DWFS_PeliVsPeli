const CompetenciaService = require('../Services/competenciaService');
const service = new CompetenciaService()

class Controller {

  constructor() { }

  async getCompetencias(req, res) {
    const result = await service.getCompetenciaList();
    return res.status(200).json(result);
  }

  async getOpciones(req, res) {
    var nombreCompetencia;
    try {
      nombreCompetencia = await service.getNombreCompetencia(req.params.id);
    } catch(error) {
      console.log("Error found at Competencia-Opciones query: ", error.message);
      return res.status(404).send("Competencia not found. Try again.");
    };
    const opcion = await service.getOpcion(nombreCompetencia);
    return res.status(200).json(opcion);
  }

  async postVoto(req, res){
    try {
      const result = await service.insertVoto(req.params.id, req.body.idPelicula);
      return res.status(201).json(result);
    }catch(error){
      console.log("Error found at Post-Voto query: ", error.message);
      return res.status(404).send("Error at post a voto. Try again.")
    }
  }

  async getResultados(req, res){
    try{
      const result = await service.selectResultadosCompetencia(req.params.id);
      return res.status(200).json(result);
    }catch(error){
      console.log("Error found at Get-Resultados query: ", error.message);
      return res.status(404).send("Error at get resultados. Try again.")
    }
  }
}

module.exports = Controller;