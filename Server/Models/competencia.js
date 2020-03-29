class Competencia {
    constructor(element) {
        this.id = element.id;
        this.nombre = element.nombre;
        this.genero = element.genero_id;
        this.actor = element.actor_id;
        this.director = element.director_id;
    }

    setNombreGenero(nombre){
        this.genero_nombre = nombre;
    }

    setNombreActor(nombre){
        this.actor_nombre = nombre;
    }

    setNombreDirector(nombre){
        this.director_nombre = nombre;
    }
}

module.exports = Competencia;