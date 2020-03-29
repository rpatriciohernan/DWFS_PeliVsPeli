const CompetenciaService = require('../Services/competenciaService');
const service = new CompetenciaService()

class Controller {

  constructor() { }

  async getCompetencias(req, res) {
    try {
      const competencias = await service.selectCompetenciaList();
      return res.status(200).json(competencias);

    } catch(error) {
      console.log("Error found at Get-Competencias query: ", error.message);
      return res.status(500).send('Error found at competencia query.');
    };
  }

  async getCompetenciaById(req, res){
    try {
      const competencia = await service.selectCompetenciaById(req.params.id);
      if(!competencia) { 
        return res.status(404).json({
          message: "Competencia not found."
        });
      };
      
      if(competencia.actor){      
        const nombre = await service.selectActorById(competencia.actor);
        competencia.setNombreActor(nombre.nombre);
      }

      if(competencia.genero){
        const nombre = await service.selectGeneroById(competencia.genero);
        competencia.setNombreGenero(nombre.nombre);
      }
      
      if(competencia.director){
        const nombre = await service.selectDirectorById(competencia.director);
        competencia.setNombreDirector(nombre.nombre);
      }

      return res.status(200).json(competencia); 

    } catch(error) {
      console.log("Error found at Get-CompetenciasById query: ", error.message);
      return res.status(500).send('Error found at competencia query.');
    };

  }

  async getPeliculasCompetencia(req, res) {
    try {
      const competencia = await service.selectCompetenciaById(req.params.id);

      if(!competencia) { 
        return res.status(404).json({
          message: "Competencia not found."
        });
      };
  
      const opcion = await service.selectOpcion(competencia);

      return res.status(200).json(opcion);

    } catch(error) {
      console.log("Error found at Get-PeliculasCompetencia query: ", error.message);
      return res.status(500).send("Error found at Opcion Peliculas Competencia query.");

    };
  }

  async postVoto(req, res){
    try {
      const competencia = await service.selectCompetenciaById(req.params.id);

      if(!competencia) {
        return res.status(404).json({
          message: "Competencia not found."
        });
      }
      
      const pelicula = await service.selectPeliculaById(req.body.idPelicula);

      if(!pelicula) {
        return res.status(404).json({
          message: "Pelicula not found."
        })
      };

      const result = await service.insertVoto(competencia.id, pelicula.id);

      return res.status(201).json(result);

    }catch(error){
      console.log("Error found at Post-Voto query: ", error.message);
      return res.status(500).send("Error found at post voto. Try again.")
    }
  }

  async getResultados(req, res){
    try{
      const result = await service.selectResultadosCompetencia(req.params.id);
      return res.status(200).json(result);
    }catch(error){
      console.log("Error found at Get-Resultados query: ", error.message);
      return res.status(500).send("Error at get resultados. Try again.")
    }
  }

  async postCompetencia(req, res){
    try{
      if (req.body.genero !== '0') {
        const genero = await service.selectGeneroById(req.body.genero);
        if(!genero) {
          return res.status(404).json({
            message: "Genero not found."
          })
        };
      };

      if (req.body.actor !== '0') {
        const actor = await service.selectActorById(req.body.actor);
        if(!actor) {
          return res.status(404).json({
            message: "Actor not found."
          })
        };
      };

      if (req.body.director !== '0') {
        const director = await service.selectDirectorById(req.body.director);

        if(!director) {
          return res.status(404).json({
            message: "Director not found."
          })
        };
      };

      const opciones = await service.selectOpcion(req.body)

      if(opciones.peliculas.length < 2) {
        return res.status(404).json({
          message: 'No hay suficientes peliculas para esta competencia'
        });
      };

      const result = await service.insertCompetencia(req.body);
      return res.status(201).json(result);

    }catch(error){
      console.log("Error found at Insert-Competencia query: ", error.message);
      return res.status(500).send("Error at post competencia. Try again.")
    }
  }

  async resetVotos(req, res){
    try{

      const competencia = await service.selectCompetenciaById(req.params.id);

      if(!competencia) {
        return res.status(404).json({
          message: "Competencia not found."
        });
      }

      const result = await service.deleteVotos(competencia.id);
      return res.status(202).json(result);

    }catch(error){
      console.log("Error found at Delete-Votos-Competencia query: ", error.message);
      return res.status(500).send("Error at reset competencia. Try again.")
    }
  }

  async deleteCompetencia(req, res){
    try{

      const competencia = await service.selectCompetenciaById(req.params.id);

      if(!competencia) {
        return res.status(404).json({
          message: "Competencia not found."
        });
      }

      await service.deleteVotos(competencia.id);
      
      const result = await service.deleteCompetencia(competencia.id);

      return res.status(202).json(result);

    }catch(error){
      console.log("Error found at Delete-Competencia query: ", error.message);
      return res.status(500).send("Error at delete competencia. Try again.")
    }
  }
}

module.exports = Controller;