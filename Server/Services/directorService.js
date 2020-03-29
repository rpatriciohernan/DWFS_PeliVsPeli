const db = require('../Utils/db');
const Director = require('../Models/director');

class Service {
    constructor() { }

    async getDirectorList() {
        const directores = [];
        const result = await db.query("SELECT * FROM competencias.director");
        result.forEach(element => directores.push(new Director(element)));
        return directores;
    }
}

module.exports = Service;