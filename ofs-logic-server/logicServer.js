/**
 # Configuración del servidor de lógica OFS

 Este documento describe cómo el servidor de lógica de OFS maneja
 las solicitudes relacionadas con la compilación y evaluación de scripts.

 Para empezar, primero importamos las bibliotecas necesarias:
 */

const express = require('express');
const cors = require('cors');
const {LOGIC_SERVER_PORT, MAIN_SERVER_PORT} = require('../ofs-client/src/config'); // Importa las configuraciones de puerto

/**
 ## Configuración básica del servidor

/**
 ## Configuración de Express y CORS

 A continuación, configuramos la aplicación Express y definimos las políticas de CORS.
 */

const app = express();

app.use(cors({
    origin: `http://localhost:${MAIN_SERVER_PORT}`, // Modificado para reflejar el puerto correcto
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/**
 ## Rutas del servidor

 Definimos las rutas que manejará el servidor.
 */

app.get('/', (_, res) => res.send('Servidor de lógica OFS en funcionamiento!'));

app.post('/compile', (req, res) => {
    const {code} = req.body;
    console.log("Código recibido para compilar:", code);
    const timestamp = new Date().toISOString();
    const output = `${timestamp}\n${code}`;
    console.log("Respuesta enviada:", output);
    res.json({
        success: true,
        input: code,
        output: `//${timestamp}\n${code}`
    });
});

app.post('/eval', (req, res) => {
    const {code} = req.body;
    res.json({
        success: true,
        input: code,
        output: code
    });
});

/**
 ## Manejo de errores y puesta en marcha del servidor

 Finalmente, configuramos el servidor para manejar errores inesperados y lo ponemos en marcha.
 */

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(LOGIC_SERVER_PORT, () => console.log(`Servidor de lógica corriendo en http://localhost:${LOGIC_SERVER_PORT}`));
