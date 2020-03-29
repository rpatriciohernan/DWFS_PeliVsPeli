/* NEW TABLE FOR COMPETENCIA*/

CREATE TABLE competencias.competencia (
	id INT AUTO_INCREMENT,
    nombre VARCHAR(150),
    PRIMARY KEY (id)
);

/* INITIAL VALUES FOR COMPETENCIA TABLE*/
INSERT INTO competencias.competencia VALUES
(NULL, '¿Cuál es la mejor película?'), (NULL, '¿Qué drama te hizo llorar más?'), (NULL, '¿Cuál es la peli más bizarra?'),
(NULL, '¿Cuál es la mejor peli con Sandra Bullock?'), (NULL, '¿Cuál es la mejor peli dirigida por Spielberg?'), (NULL, '¿Cuál documental te parecio mas interesante?');


/* NEW TABLE FOR VOTO*/
CREATE TABLE competencias.voto (
	id INT AUTO_INCREMENT,
    competencia_id INT,
    pelicula_id int(11) unsigned NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (competencia_id) REFERENCES competencia(id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
);


/* NEW COLUMN IN COMPETENCIA TABLE TO ALLOW RELATION WITH GENERO TABLE*/
ALTER TABLE competencias.competencia
ADD COLUMN genero_id int(11) unsigned;

ALTER TABLE competencias.competencia
ADD CONSTRAINT FOREIGN KEY (genero_id) REFERENCES genero(id);

/* NEW COLUMN IN COMPETENCIA TABLE TO ALLOW RELATION WITH DIRECTOR TABLE*/
ALTER TABLE competencias.competencia
ADD COLUMN director_id int(11) unsigned;

ALTER TABLE competencias.competencia
ADD CONSTRAINT FOREIGN KEY (director_id) REFERENCES director(id);

/* NEW COLUMN IN COMPETENCIA TABLE TO ALLOW RELATION WITH ACTOR TABLE*/
ALTER TABLE competencias.competencia
ADD COLUMN actor_id int(11) unsigned;

ALTER TABLE competencias.competencia
ADD CONSTRAINT FOREIGN KEY (actor_id) REFERENCES actor(id);

/* NEW COLUMN IN VOTO TABLE TO ALLOW LOGIC DELETE*/
ALTER TABLE competencias.voto
ADD COLUMN active BOOLEAN;

ALTER TABLE competencias.voto
ALTER active SET DEFAULT true;


/* NEW COLUMN IN COMPETENCIA TABLE TO ALLOW LOGIC DELETE*/
ALTER TABLE competencias.competencia
ADD COLUMN active BOOLEAN;

ALTER TABLE competencias.competencia
ALTER active SET DEFAULT true;

UPDATE competencias.competencia 
SET active = true;