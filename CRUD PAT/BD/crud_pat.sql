--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_categoria_seq OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;


--
-- Name: configuracion_partida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configuracion_partida (
    id_configuracion_partida integer NOT NULL,
    id_categoria integer,
    id_estado_partida integer,
    estado_configuracion boolean NOT NULL,
    id_nivel_facil integer,
    id_nivel_medio integer,
    id_nivel_dificil integer
);


ALTER TABLE public.configuracion_partida OWNER TO postgres;

--
-- Name: configuracion_partida_id_configuracion_partida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.configuracion_partida_id_configuracion_partida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.configuracion_partida_id_configuracion_partida_seq OWNER TO postgres;

--
-- Name: configuracion_partida_id_configuracion_partida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.configuracion_partida_id_configuracion_partida_seq OWNED BY public.configuracion_partida.id_configuracion_partida;


--
-- Name: estado_partida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_partida (
    id_estado_partida integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.estado_partida OWNER TO postgres;

--
-- Name: estado_partida_id_estado_partida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_partida_id_estado_partida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_partida_id_estado_partida_seq OWNER TO postgres;

--
-- Name: estado_partida_id_estado_partida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_partida_id_estado_partida_seq OWNED BY public.estado_partida.id_estado_partida;


--
-- Name: jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jugador (
    id_jugador integer NOT NULL,
    nombre character varying(50) NOT NULL,
    numerodocumento character varying(12) NOT NULL,
    puntos integer
);


ALTER TABLE public.jugador OWNER TO postgres;

--
-- Name: jugador_id_jugador_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jugador_id_jugador_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jugador_id_jugador_seq OWNER TO postgres;

--
-- Name: jugador_id_jugador_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jugador_id_jugador_seq OWNED BY public.jugador.id_jugador;


--
-- Name: tiempo_memorizacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tiempo_memorizacion (
    id_tiempo_memorizacion integer NOT NULL,
    id_tiempo_nivel integer,
    tiempo integer NOT NULL,
    id_configuracion_partida integer
);


ALTER TABLE public.tiempo_memorizacion OWNER TO postgres;

--
-- Name: tiempo_memorizacion_id_tiempo_memorizacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tiempo_memorizacion_id_tiempo_memorizacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tiempo_memorizacion_id_tiempo_memorizacion_seq OWNER TO postgres;

--
-- Name: tiempo_memorizacion_id_tiempo_memorizacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tiempo_memorizacion_id_tiempo_memorizacion_seq OWNED BY public.tiempo_memorizacion.id_tiempo_memorizacion;


--
-- Name: tiempo_orden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tiempo_orden (
    id_tiempo_orden integer NOT NULL,
    id_tiempo_nivel integer,
    tiempo integer NOT NULL,
    id_configuracion_partida integer
);


ALTER TABLE public.tiempo_orden OWNER TO postgres;

--
-- Name: tiempo_orden_id_tiempo_orden_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tiempo_orden_id_tiempo_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tiempo_orden_id_tiempo_orden_seq OWNER TO postgres;

--
-- Name: tiempo_orden_id_tiempo_orden_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tiempo_orden_id_tiempo_orden_seq OWNED BY public.tiempo_orden.id_tiempo_orden;


--
-- Name: tiempos_nivel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tiempos_nivel (
    id_tiempo_nivel integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.tiempos_nivel OWNER TO postgres;

--
-- Name: tiempos_nivel_id_tiempo_nivel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tiempos_nivel_id_tiempo_nivel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tiempos_nivel_id_tiempo_nivel_seq OWNER TO postgres;

--
-- Name: tiempos_nivel_id_tiempo_nivel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tiempos_nivel_id_tiempo_nivel_seq OWNED BY public.tiempos_nivel.id_tiempo_nivel;


--
-- Name: categorias id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);


--
-- Name: configuracion_partida id_configuracion_partida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion_partida ALTER COLUMN id_configuracion_partida SET DEFAULT nextval('public.configuracion_partida_id_configuracion_partida_seq'::regclass);


--
-- Name: estado_partida id_estado_partida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_partida ALTER COLUMN id_estado_partida SET DEFAULT nextval('public.estado_partida_id_estado_partida_seq'::regclass);


--
-- Name: jugador id_jugador; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador ALTER COLUMN id_jugador SET DEFAULT nextval('public.jugador_id_jugador_seq'::regclass);


--
-- Name: tiempo_memorizacion id_tiempo_memorizacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_memorizacion ALTER COLUMN id_tiempo_memorizacion SET DEFAULT nextval('public.tiempo_memorizacion_id_tiempo_memorizacion_seq'::regclass);


--
-- Name: tiempo_orden id_tiempo_orden; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_orden ALTER COLUMN id_tiempo_orden SET DEFAULT nextval('public.tiempo_orden_id_tiempo_orden_seq'::regclass);


--
-- Name: tiempos_nivel id_tiempo_nivel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempos_nivel ALTER COLUMN id_tiempo_nivel SET DEFAULT nextval('public.tiempos_nivel_id_tiempo_nivel_seq'::regclass);


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id_categoria, nombre) FROM stdin;
1	Numeros
2	Frutas
3	Computo
\.


--
-- Data for Name: configuracion_partida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.configuracion_partida (id_configuracion_partida, id_categoria, id_estado_partida, estado_configuracion, id_nivel_facil, id_nivel_medio, id_nivel_dificil) FROM stdin;
\.


--
-- Data for Name: estado_partida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado_partida (id_estado_partida, descripcion) FROM stdin;
1	En Espera
2	En Proceso
3	Terminada
\.


--
-- Data for Name: jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jugador (id_jugador, nombre, numerodocumento, puntos) FROM stdin;
\.


--
-- Data for Name: tiempo_memorizacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tiempo_memorizacion (id_tiempo_memorizacion, id_tiempo_nivel, tiempo, id_configuracion_partida) FROM stdin;
\.


--
-- Data for Name: tiempo_orden; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tiempo_orden (id_tiempo_orden, id_tiempo_nivel, tiempo, id_configuracion_partida) FROM stdin;
\.


--
-- Data for Name: tiempos_nivel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tiempos_nivel (id_tiempo_nivel, nombre) FROM stdin;
1	Nivel Facil
2	Nivel Medio
3	Nivel Dificil
\.


--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_categoria_seq', 3, true);


--
-- Name: configuracion_partida_id_configuracion_partida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.configuracion_partida_id_configuracion_partida_seq', 1, false);


--
-- Name: estado_partida_id_estado_partida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_partida_id_estado_partida_seq', 3, true);


--
-- Name: jugador_id_jugador_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jugador_id_jugador_seq', 1, false);


--
-- Name: tiempo_memorizacion_id_tiempo_memorizacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tiempo_memorizacion_id_tiempo_memorizacion_seq', 1, false);


--
-- Name: tiempo_orden_id_tiempo_orden_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tiempo_orden_id_tiempo_orden_seq', 1, false);


--
-- Name: tiempos_nivel_id_tiempo_nivel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tiempos_nivel_id_tiempo_nivel_seq', 3, true);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);


--
-- Name: configuracion_partida configuracion_partida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion_partida
    ADD CONSTRAINT configuracion_partida_pkey PRIMARY KEY (id_configuracion_partida);


--
-- Name: estado_partida estado_partida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_partida
    ADD CONSTRAINT estado_partida_pkey PRIMARY KEY (id_estado_partida);


--
-- Name: jugador jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador
    ADD CONSTRAINT jugador_pkey PRIMARY KEY (id_jugador);


--
-- Name: tiempo_memorizacion tiempo_memorizacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_memorizacion
    ADD CONSTRAINT tiempo_memorizacion_pkey PRIMARY KEY (id_tiempo_memorizacion);


--
-- Name: tiempo_orden tiempo_orden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_orden
    ADD CONSTRAINT tiempo_orden_pkey PRIMARY KEY (id_tiempo_orden);


--
-- Name: tiempos_nivel tiempos_nivel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempos_nivel
    ADD CONSTRAINT tiempos_nivel_pkey PRIMARY KEY (id_tiempo_nivel);


--
-- Name: configuracion_partida configuracion_partida_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion_partida
    ADD CONSTRAINT configuracion_partida_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria) ON DELETE SET NULL;


--
-- Name: configuracion_partida configuracion_partida_id_estado_partida_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion_partida
    ADD CONSTRAINT configuracion_partida_id_estado_partida_fkey FOREIGN KEY (id_estado_partida) REFERENCES public.estado_partida(id_estado_partida) ON DELETE SET NULL;


--
-- Name: configuracion_partida configuracion_partida_id_nivel_dificil_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion_partida
    ADD CONSTRAINT configuracion_partida_id_nivel_dificil_fkey FOREIGN KEY (id_nivel_dificil) REFERENCES public.tiempos_nivel(id_tiempo_nivel) ON DELETE SET NULL;


--
-- Name: configuracion_partida configuracion_partida_id_nivel_facil_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion_partida
    ADD CONSTRAINT configuracion_partida_id_nivel_facil_fkey FOREIGN KEY (id_nivel_facil) REFERENCES public.tiempos_nivel(id_tiempo_nivel) ON DELETE SET NULL;


--
-- Name: configuracion_partida configuracion_partida_id_nivel_medio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion_partida
    ADD CONSTRAINT configuracion_partida_id_nivel_medio_fkey FOREIGN KEY (id_nivel_medio) REFERENCES public.tiempos_nivel(id_tiempo_nivel) ON DELETE SET NULL;


--
-- Name: tiempo_memorizacion tiempo_memorizacion_id_configuracion_partida_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_memorizacion
    ADD CONSTRAINT tiempo_memorizacion_id_configuracion_partida_fkey FOREIGN KEY (id_configuracion_partida) REFERENCES public.configuracion_partida(id_configuracion_partida) ON DELETE CASCADE;


--
-- Name: tiempo_memorizacion tiempo_memorizacion_id_tiempo_nivel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_memorizacion
    ADD CONSTRAINT tiempo_memorizacion_id_tiempo_nivel_fkey FOREIGN KEY (id_tiempo_nivel) REFERENCES public.tiempos_nivel(id_tiempo_nivel) ON DELETE CASCADE;


--
-- Name: tiempo_orden tiempo_orden_id_configuracion_partida_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_orden
    ADD CONSTRAINT tiempo_orden_id_configuracion_partida_fkey FOREIGN KEY (id_configuracion_partida) REFERENCES public.configuracion_partida(id_configuracion_partida) ON DELETE CASCADE;


--
-- Name: tiempo_orden tiempo_orden_id_tiempo_nivel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiempo_orden
    ADD CONSTRAINT tiempo_orden_id_tiempo_nivel_fkey FOREIGN KEY (id_tiempo_nivel) REFERENCES public.tiempos_nivel(id_tiempo_nivel) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

