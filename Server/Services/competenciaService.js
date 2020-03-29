
const db = require('../Utils/db');
const Competencia = require('../Models/competencia');
const Pelicula = require('../Models/pelicula');
const Genero = require('../Models/genero');
const Actor = require('../Models/actor');
const Director = require('../Models/director');
const Opcion = require('../Models/opcion');
const Resultado = require('../Models/resultado');

class Service {
    constructor() { }

    async selectCompetenciaList() {
        const competencias = [];
        const result = await db.query("SELECT * FROM competencias.competencia WHERE active=TRUE");
        result.forEach(element => competencias.push(new Competencia(element)));
        return competencias;
    }

    async selectCompetenciaById(idCompetencia){
        const result = await db.query(`SELECT * FROM competencias.competencia WHERE active=TRUE AND id=${parseInt(idCompetencia)}`);
        if (!result) {
            return null;
        } else {
            return new Competencia(result[0]);
        }
    }

    async selectPeliculaById(idPelicula){
        const result = await db.query(`SELECT * FROM competencias.pelicula WHERE id=${parseInt(idPelicula)}`);
        if (!result){
            return null;
        }else {
            return new Pelicula(result[0]);    
        } 
    }

    async selectGeneroById(idGenero){
        const result = await db.query(`SELECT * FROM competencias.genero WHERE id=${parseInt(idGenero)}`);   
        if (!result){
            return null;
        }else {
            return new Genero(result[0]); 
        } 
    }

    async selectActorById(idActor){
        const result = await db.query(`SELECT * FROM competencias.actor WHERE id=${parseInt(idActor)}`);
        if (!result ){
            return null;
        }else {
            return new Actor(result[0]);     
        }
    }

    async selectDirectorById(idDirector){
        const result = await db.query(`SELECT * FROM competencias.director WHERE id=${parseInt(idDirector)}`); 
        if (!result ){
            return null;
        }else {
            return new Director(result[0]);    
        } 
    }

    async selectOpcion(competencia){

        var statementSelection = `SELECT p.id, p.titulo, p.poster FROM competencias.pelicula as p`;

        var statementCondition = ` WHERE 1=1`

        if(competencia.actor){ 
            statementSelection += ` INNER JOIN competencias.actor_pelicula as r1 ON r1.pelicula_id = p.id`;
            statementCondition +=` AND r1.actor_id = ${parseInt(competencia.actor)}`;
        };

        if(competencia.director){ 
            statementSelection += ` INNER JOIN competencias.director_pelicula as r2 ON r2.pelicula_id = p.id`;
            statementCondition += ` AND r2.director_id = ${parseInt(competencia.director)}`;
        };

        if(competencia.genero){ 
            statementCondition += ` AND genero_id=${parseInt(competencia.genero)}`
        };

        var statement = statementSelection + statementCondition + ` ORDER BY RAND() LIMIT 2;`;

        const resultPeliculas = await db.query(statement);
        return new Opcion(competencia.nombre, resultPeliculas);
    }

    async insertVoto(idCompetencia, idPelicula){
        return await db.query(`INSERT INTO competencias.voto VALUES (NULL, ${idCompetencia}, ${idPelicula}, true)`);        
    }

    async selectResultadosCompetencia(idCompetencia){
        const statement = `SELECT p.id as pelicula_id, p.poster, p.titulo, COUNT(*) as votos 
        FROM competencias.pelicula as p
        INNER JOIN competencias.voto as v
        ON v.pelicula_id = p.id
        WHERE v.competencia_id = ${parseInt(idCompetencia)} AND v.active = true
        GROUP BY p.id
        ORDER BY votos DESC
        LIMIT 3;`;
        const resultados = await db.query(statement); 
        const nombreCompetencia = await db.query(`SELECT nombre FROM competencias.competencia WHERE ID=${parseInt(idCompetencia)}`);
        const result = new Resultado(nombreCompetencia.nombre, resultados);
        return result;
    }

    async insertCompetencia(competencia){

        var statement = `INSERT INTO competencias.competencia VALUES (NULL, '${competencia.nombre}',`;
        
        if (competencia.genero !== '0') {
            statement += ` ${parseInt(competencia.genero)},`;
        }else{
            statement += ` NULL,`;
        };
           
        if (competencia.director !== '0') {
            statement += ` ${parseInt(competencia.director)},`;
        }else{
            statement += ` NULL,`;
        };     
                   
        if (competencia.actor !== '0') {
            statement += ` ${parseInt(competencia.actor)})`;
        }else{
            statement += ` NULL)`;
        };     

        return await db.query(statement);
    }

    async deleteVotos(idCompetencia){
        const statement = `UPDATE competencias.voto SET active = false
        WHERE competencia_id=${parseInt(idCompetencia)};`
        return await db.query(statement);
    }

    async deleteCompetencia(idCompetencia){
        const statement = `UPDATE competencias.competencia SET active = false
        WHERE id=${parseInt(idCompetencia)};`
        return await db.query(statement);
    }

    async updateCompetencia(competencia){
        const statement = `UPDATE competencias.competencia SET nombre = '${competencia.nombre}' 
        WHERE id=${parseInt(competencia.id)};`
        return await db.query(statement);
    }
}

module.exports = Service;