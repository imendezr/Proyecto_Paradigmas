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

app.post('/api/save', (req, res) => {
    const {scriptName, code} = req.body;
    const validInput = scriptName && code && typeof scriptName === "string" && typeof code === "string";

    if (validInput) {
        try {
            saveToFile(scriptName, code);
            res.json({ success: true, message: `Script ${scriptName} guardado con éxito.` });
        } catch (error) {
            console.error("Error al guardar el script:", error);
            res.status(500).json({ success: false, message: "Error al guardar el script." });
        }
    } else {
        res.status(400).json({ success: false, message: "Nombre del script o código no válido." });
    }
});

app.get('/api/retrieve/:scriptName', (req, res) => {
    const {scriptName} = req.params;
    console.log("Intentando recuperar el script:", scriptName);

    try {
        const code = readFromFile(scriptName);
        code
            ? res.json({ success: true, code })
            : res.status(404).json({ success: false, message: `Script ${scriptName} no encontrado.` });
    } catch (error) {
        console.error("Error al recuperar el script:", error);
        res.status(500).json({ success: false, message: "Error al recuperar el script." });
    }
});

app.post('/api/compile', async (req, res) => {
    const { code } = req.body;
    try {
        const response = await axios.post('http://localhost:3001/compile', { code });
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con el servidor de lógica:", error);
        res.status(500).json({ success: false, message: "Error al comunicarse con el servidor de lógica." });
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
