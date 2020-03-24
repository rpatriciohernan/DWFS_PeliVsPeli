const db = require('../Utils/db');
const Competencia = require('../Models/competencia');
const Opcion = require('../Models/opcion');
const Resultado = require('../Models/resultado');

class Service {
    constructor() { }

    async getCompetenciaList() {
        const competencias = [];
        const result = await db.query("SELECT * FROM competencias.competencia");
        result.forEach(element => competencias.push(new Competencia(element)));
        return competencias;
    }

    async getOpcion(nombreCompetencia){
        const resultPeliculas = await db.query(`SELECT id, titulo, poster FROM competencias.pelicula ORDER BY RAND() LIMIT 2;`);
        var opcion = new Opcion(nombreCompetencia, resultPeliculas);
        return opcion;
    }

    async getNombreCompetencia(idCompetencia){
        const resultCompetencia = await db.query(`SELECT nombre FROM competencias.competencia WHERE id=${parseInt(idCompetencia)}`);
        return resultCompetencia[0].nombre;
    }

    async insertVoto(idCompetencia, idPelicula){
        const result = await db.query(`INSERT INTO competencias.voto VALUES (NULL, ${idCompetencia}, ${idPelicula})`);
        return result;
    }

    async selectResultadosCompetencia(idCompetencia){
        const sentence = `SELECT p.id as pelicula_id, p.poster, p.titulo, COUNT(*) as votos 
        FROM competencias.pelicula as p
        INNER JOIN competencias.voto as v
        ON v.pelicula_id = p.id
        WHERE v.competencia_id = ${parseInt(idCompetencia)}
        GROUP BY p.id ASC
        LIMIT 3;`;
        const resultados = await db.query(sentence);
        const nombreCompetencia = await db.query(`SELECT nombre FROM competencias.competencia WHERE ID=${parseInt(idCompetencia)}`);
        const result = new Resultado(nombreCompetencia.nombre, resultados);
        return result;
    }
}

module.exports = Service;