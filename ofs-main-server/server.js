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

 Establecemos el puerto y la ubicación donde se guardarán los scripts.
 */

const PORT = 3005;
const SCRIPTS_DIR = path.join(__dirname, 'scripts');

/**
 Ahora, creamos el directorio donde se guardarán los scripts si aún no existe.
 */

(fs.existsSync(SCRIPTS_DIR) || fs.mkdirSync(SCRIPTS_DIR));

/**
 ## Configuración de Express y CORS

 A continuación, configuramos la aplicación Express y definimos las políticas de CORS.
 */

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
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

const saveToFile = (scriptName, code) =>
    fs.writeFileSync(path.join(SCRIPTS_DIR, `${scriptName}.txt`), code);

const readFromFile = scriptName =>
    fs.existsSync(path.join(SCRIPTS_DIR, `${scriptName}.txt`))
        ? fs.readFileSync(path.join(SCRIPTS_DIR, `${scriptName}.txt`), 'utf8')
        : null;

app.post('/script/save', async (req, res) => {
    const {scriptName, code} = req.body;

    try {
        const response = await axios.post('http://localhost:3006/script/save', {scriptName, code});
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al guardar el script."});
    }
});

app.get('/script/:scriptName', async (req, res) => {
    const {scriptName} = req.params;

    try {
        const response = await axios.get(`http://localhost:3006/script/${scriptName}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error.response ? error.response.data : error.message);
        res.status(500).json({success: false, message: "Error al recuperar el script."});
    }
});

/** Información de los miembros del equipo en formato JSON */
const teamDetails = {
    teamMembers: [
        {
            name: "Isaac Méndez Rodríguez",
            id: "118090020",
            course: "Paradigmas de programación",
            schedule: "1 pm",
            project: "Entorno Prototipo para el Lenguaje OneFlowStream (OFS)",
            semester: "II Ciclo",
            year: 2023,
            school: "Escuela de informática",
            university: "Universidad Nacional de Costa Rica (UNA)",
        },
        /** Añadir información de los otros miembros
         {
         name: "Nombre",
         ...
         },
         ... */
    ],
};
app.get('/about', (_, res) => {
    res.json(teamDetails); // Retorna la información del equipo en formato JSON
});

app.post('/api/compile', async (req, res) => {
    const {code} = req.body;
    try {
        const response = await axios.post('http://localhost:3001/compile', {code});
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de lógica:", error);
        res.status(500).json({success: false, message: "Error al comunicarse con el servidor de lógica."});
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

app.listen(PORT, () => console.log(`Servidor principal corriendo en http://localhost:${PORT}`));
