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

INSERT INTO competencias.voto VALUES (NULL, 5, 10);

SELECT * FROM competencias.voto;

SELECT p.id as pelicula_id, p.poster, p.titulo, COUNT(*) as votos 
FROM competencias.pelicula as p
INNER JOIN competencias.voto as v
ON v.pelicula_id = p.id
WHERE v.competencia_id = 5
GROUP BY p.id;