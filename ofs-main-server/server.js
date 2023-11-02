/**
 # Configuración del servidor principal OFS

 Este documento describe la configuración del servidor principal que actúa como
 un intermediario entre el cliente y el servidor de lógica de negocios.

 Para empezar, primero importamos las bibliotecas necesarias:
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 ## Configuración básica del servidor

 Establecemos el puerto
 */

const { MAIN_SERVER_PORT, PERSISTENCE_SERVER_PORT, LOGIC_SERVER_PORT, CLIENT_PORT } = require('../ofs-client/src/config');

/**
 ## Configuración de Express y CORS

 A continuación, configuramos la aplicación Express y definimos las políticas de CORS.
 */

const app = express();

app.use(cors({
    origin: `http://localhost:${CLIENT_PORT}`,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/**
 ## Rutas del servidor

 Definimos las rutas que manejará el servidor.
 */

app.get('/', (_, res) => res.send('Servidor principal OFS en funcionamiento!'));

/**
 El servidor también permitirá guardar y recuperar scripts por nombre.
 */

app.post('/script/save', async (req, res) => {
    const {id, code} = req.body;

    try {
        const response = await axios.post(`http://localhost:${PERSISTENCE_SERVER_PORT}/script/save`, {id, code});
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al guardar el script."});
    }
});

app.get('/script/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const response = await axios.get(`http://localhost:${PERSISTENCE_SERVER_PORT}/script/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error.response ? error.response.data : error.message);
        res.status(500).json({success: false, message: "Error al recuperar el script."});
    }
});

app.get('/getTxt', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:${PERSISTENCE_SERVER_PORT}/getTxt`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error.response ? error.response.data : error.message);
        res.status(500).json({success: false, message: "Error al recuperar el script."});
    }
});

app.get('/keywords', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:${PERSISTENCE_SERVER_PORT}/keywords`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al obtener las palabras clave."});
    }
});

app.get('/about', async (_, res) => {
    try {
        const response = await axios.get(`http://localhost:${PERSISTENCE_SERVER_PORT}/about`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al obtener información acerca del equipo."});
    }
});

app.post('/api/compile', async (req, res) => {
    const {code} = req.body;
    try {
        const response = await axios.post(`http://localhost:${LOGIC_SERVER_PORT}/compile`, {code});
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de lógica:", error);
        res.status(500).json({success: false, message: "Error al comunicarse con el servidor de lógica."});
    }
});

app.get('/api/fixed', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:${PERSISTENCE_SERVER_PORT}/fixed`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al comunicarse con el servidor de persistencia."});
    }
});

app.get('/api/fixed2', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:${PERSISTENCE_SERVER_PORT}/fixed2`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al comunicarse con el servidor de persistencia."});
    }
});

app.post('/api/eval', (req, res) => {
    const {code} = req.body;

    try {
        // Evalúa el código y obtén el resultado
        const result = eval(code);
        res.json({success: true, output: result});
    } catch (error) {
        console.error("Error al evaluar el código en el servidor:", error);
        res.status(500).json({success: false, message: "Error al evaluar el código en el servidor."});
    }
});

/**
 ## Manejo de errores y puesta en marcha del servidor

 Finalmente, configuramos el servidor para manejar errores inesperados y lo ponemos en marcha.
 */


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(MAIN_SERVER_PORT, () => console.log(`Servidor principal corriendo en http://localhost:${MAIN_SERVER_PORT}`));
