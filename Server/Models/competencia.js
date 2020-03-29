class Competencia {
    constructor(element) {
        this.id = element.id;
        this.nombre = element.nombre;
        this.genero = element.genero_id;
        this.actor = element.actor_id;
        this.director = element.director_id;
    }
}

module.exports = Competencia;