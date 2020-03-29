const db = require('../Utils/db');
const Genero = require('../Models/genero');

class Service {
    constructor() { }

    async getGeneroList() {
        const generos = [];
        const result = await db.query("SELECT * FROM competencias.genero");
        result.forEach(element => generos.push(new Genero(element)));
        return generos;
    }
}

module.exports = Service;