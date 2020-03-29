CREATE TABLE competencias.competencia (
	id INT AUTO_INCREMENT,
    nombre VARCHAR(150),
    PRIMARY KEY (id)
);

INSERT INTO competencias.competencia VALUES
(NULL, '¿Cuál es la mejor película?'), (NULL, '¿Qué drama te hizo llorar más?'), (NULL, '¿Cuál es la peli más bizarra?'),
(NULL, '¿Cuál es la mejor peli con Sandra Bullock?'), (NULL, '¿Cuál es la mejor peli dirigida por Spielberg?'), (NULL, '¿Cuál documental te parecio mas interesante?');


SELECT id, titulo, poster FROM competencias.pelicula ORDER BY RAND() LIMIT 2;

CREATE TABLE competencias.voto (
	id INT AUTO_INCREMENT,
    competencia_id INT,
    pelicula_id int(11) unsigned NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (competencia_id) REFERENCES competencia(id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
);

ALTER TABLE competencias.competencia
ADD COLUMN genero_id int(11) unsigned;

ALTER TABLE competencias.competencia
ADD CONSTRAINT FOREIGN KEY (genero_id) REFERENCES genero(id);

ALTER TABLE competencias.competencia
ADD COLUMN director_id int(11) unsigned;

ALTER TABLE competencias.competencia
ADD CONSTRAINT FOREIGN KEY (director_id) REFERENCES director(id);

ALTER TABLE competencias.competencia
ADD COLUMN actor_id int(11) unsigned;

ALTER TABLE competencias.competencia
ADD CONSTRAINT FOREIGN KEY (actor_id) REFERENCES actor(id);

ALTER TABLE competencias.voto
ADD COLUMN active BOOLEAN;

ALTER TABLE competencias.voto
ALTER active SET DEFAULT true;

/*BORRADOR*/

/*statement inicial*/
SELECT p.id, p.titulo, p.poster 
FROM competencias.pelicula as p
/*statement si pide actores*/
INNER JOIN competencias.actor_pelicula as r1 ON r1.pelicula_id = p.id
/*statement si pide directores*/
INNER JOIN competencias.director_pelicula as r2 ON r2.pelicula_id = p.id
/*statement where inicial*/
WHERE 1=1 
/*statement where si pide actor*/
AND r1.actor_id = 98 
/*statement where si pide director*/
AND r2.director_id = 4233
/*statement where si pide genero*/
AND p.genero_id = 13 

