const db = require('../Utils/db');
const Actor = require('../Models/actor');

class Service {
    constructor() { }

    async getActorList() {
        const actores = [];
        const result = await db.query("SELECT * FROM competencias.actor");
        result.forEach(element => actores.push(new Actor(element)));
        return actores;
    }
}

module.exports = Service;