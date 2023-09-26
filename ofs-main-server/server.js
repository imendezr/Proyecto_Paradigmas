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

const saveToFile = (id, code) =>
    fs.writeFileSync(path.join(SCRIPTS_DIR, `${id}.txt`), code);

const readFromFile = id =>
    fs.existsSync(path.join(SCRIPTS_DIR, `${id}.txt`))
        ? fs.readFileSync(path.join(SCRIPTS_DIR, `${id}.txt`), 'utf8')
        : null;

app.post('/script/save', async (req, res) => {
    const {id, code} = req.body;

    try {
        const response = await axios.post('http://localhost:3006/script/save', {id, code});
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al guardar el script."});
    }
});

app.get('/script/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const response = await axios.get(`http://localhost:3006/script/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error.response ? error.response.data : error.message);
        res.status(500).json({success: false, message: "Error al recuperar el script."});
    }
});

app.get('/getTxt', async (req, res) => {

    try {
        const response = await axios.get(`http://localhost:3006/getTxt`);
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia #4:", error.response ? error.response.data : error.message);
        res.status(500).json({success: false, message: "Error al recuperar el script."});
    }
});

app.get('/about', async (_, res) => {
    try {
        const response = await axios.get('http://localhost:3006/about');
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de persistencia:", error);
        res.status(500).json({success: false, message: "Error al obtener información acerca del equipo."});
    }
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

app.post('/api/eval', async (req, res) => {
    const {code} = req.body;
    try {
        const response = await axios.post('http://localhost:3001/eval', {code});
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de lógica para evaluación:", error);
        res.status(500).json({
            success: false,
            message: "Error al comunicarse con el servidor de lógica para evaluación."
        });
    }
});

/**
 ## Manejo de errores y puesta en marcha del servidor

 Finalmente, configuramos el servidor para manejar errores inesperados y lo ponemos en marcha.
 */

/*app.post('/suggestions', async (req, res) => {
    const { input } = req.query;
    try {
        const response = await axios.post('http://localhost:3006/suggestions', {input});
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor.", error);
        res.status(500).json({
            success: false,
            message: "Error al comunicarse con el servidor."
        });
    }


    res.json({ suggestions: matchingSuggestions });
});*/
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => console.log(`Servidor principal corriendo en http://localhost:${PORT}`));
