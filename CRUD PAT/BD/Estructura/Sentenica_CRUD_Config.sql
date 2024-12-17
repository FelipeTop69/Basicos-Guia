-- Crear tablas sin llaves primarias ni foráneas
CREATE TABLE estado_partida (
    id_estado_partida SERIAL,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE categorias (
    id_categoria SERIAL,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tiempos_nivel (
    id_tiempo_nivel SERIAL,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tiempo_memorizacion (
    id_tiempo_memorizacion SERIAL,
    id_tiempo_nivel INT,
    tiempo INTEGER NOT NULL,
    id_configuracion_partida INT
);

CREATE TABLE tiempo_orden (
    id_tiempo_orden SERIAL,
    id_tiempo_nivel INT,
    tiempo INTEGER NOT NULL,
    id_configuracion_partida INT
);

CREATE TABLE configuracion_partida (
    id_configuracion_partida SERIAL,
    id_categoria INT,
    id_estado_partida INT,
    estado_configuracion BOOLEAN NOT NULL,
    id_nivel_facil INT,
    id_nivel_medio INT,
    id_nivel_dificil INT
);

-- Llaves Primarias
ALTER TABLE estado_partida ADD PRIMARY KEY (id_estado_partida);
ALTER TABLE categorias ADD PRIMARY KEY (id_categoria);
ALTER TABLE tiempos_nivel ADD PRIMARY KEY (id_tiempo_nivel);
ALTER TABLE tiempo_memorizacion ADD PRIMARY KEY (id_tiempo_memorizacion);
ALTER TABLE tiempo_orden ADD PRIMARY KEY (id_tiempo_orden);
ALTER TABLE configuracion_partida ADD PRIMARY KEY (id_configuracion_partida);

-- Agregar las llaves foráneas para las tablas relacionadas
ALTER TABLE tiempo_memorizacion
    ADD CONSTRAINT fk_tiempo_nivel_memorizacion FOREIGN KEY (id_tiempo_nivel)
    REFERENCES tiempos_nivel(id_tiempo_nivel) ON DELETE CASCADE;

ALTER TABLE tiempo_memorizacion
    ADD CONSTRAINT fk_configuracion_partida_memorizacion FOREIGN KEY (id_configuracion_partida)
    REFERENCES configuracion_partida(id_configuracion_partida) ON DELETE CASCADE;

ALTER TABLE tiempo_orden
    ADD CONSTRAINT fk_tiempo_nivel_orden FOREIGN KEY (id_tiempo_nivel)
    REFERENCES tiempos_nivel(id_tiempo_nivel) ON DELETE CASCADE;

ALTER TABLE tiempo_orden
    ADD CONSTRAINT fk_configuracion_partida_orden FOREIGN KEY (id_configuracion_partida)
    REFERENCES configuracion_partida(id_configuracion_partida) ON DELETE CASCADE;

ALTER TABLE configuracion_partida
    ADD CONSTRAINT fk_categoria FOREIGN KEY (id_categoria)
    REFERENCES categorias(id_categoria) ON DELETE SET NULL;

ALTER TABLE configuracion_partida
    ADD CONSTRAINT fk_estado_partida FOREIGN KEY (id_estado_partida)
    REFERENCES estado_partida(id_estado_partida) ON DELETE SET NULL;

ALTER TABLE configuracion_partida
    ADD CONSTRAINT fk_nivel_facil FOREIGN KEY (id_nivel_facil)
    REFERENCES tiempos_nivel(id_tiempo_nivel) ON DELETE SET NULL;

ALTER TABLE configuracion_partida
    ADD CONSTRAINT fk_nivel_medio FOREIGN KEY (id_nivel_medio)
    REFERENCES tiempos_nivel(id_tiempo_nivel) ON DELETE SET NULL;

ALTER TABLE configuracion_partida
    ADD CONSTRAINT fk_nivel_dificil FOREIGN KEY (id_nivel_dificil)
    REFERENCES tiempos_nivel(id_tiempo_nivel) ON DELETE SET NULL;


INSERT INTO estado_partida (descripcion) VALUES 
    ('En Espera'), 
    ('En Proceso'), 
    ('Terminada');

INSERT INTO categorias (nombre) VALUES 
    ('Numeros'), 
    ('Frutas'), 
    ('Computo');

INSERT INTO tiempos_nivel (nombre) VALUES 
    ('Nivel Facil'), 
    ('Nivel Medio'), 
    ('Nivel Dificil');
