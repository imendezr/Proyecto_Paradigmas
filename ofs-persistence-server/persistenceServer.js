/**
 # Configuración del servidor de persistencia OFS

 Este documento describe cómo el servidor de persistencia de OFS maneja
 las solicitudes relacionadas con la persistencia de scripts.

 Para empezar, primero importamos las bibliotecas necesarias:
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const aboutInfo = require('./about.json'); // Archivo json con la información de los miembros del equipo

/**
 ## Configuración básica del servidor

 Establecemos el puerto y la ubicación donde se guardarán los scripts.
 */

const PORT = 3006;
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
    origin: 'http://localhost:3005',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/**
 ## Funciones de ayuda para la persistencia de datos

 Estas funciones permiten guardar y leer scripts del disco.
 */

const saveToFile = (id, code) =>
    fs.writeFileSync(path.join(SCRIPTS_DIR, `${id}.txt`), code);

const readFromFile = id =>
    fs.existsSync(path.join(SCRIPTS_DIR, `${id}.txt`))
        ? fs.readFileSync(path.join(SCRIPTS_DIR, `${id}.txt`), 'utf8')
        : null;

/**
 ## Rutas del servidor

 Definimos las rutas que manejarán las operaciones de persistencia.
 */

app.post('/script/save', (req, res) => {
    const {id, code} = req.body;

    try {
        saveToFile(id, code);
        res.json({success: true, message: `Script ${id} guardado con éxito.`});
    } catch (error) {
        res.status(500).json({success: false, message: "Error al guardar el script."});
    }
});

app.get('/script/:id', (req, res) => {
    const {id} = req.params;

    try {
        const code = readFromFile(id);
        code
            ? res.json({success: true, code})
            : res.status(404).json({success: false, message: `Script ${id} no encontrado.`});
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        res.status(500).json({success: false, message: "Error al recuperar el script."});
    }
});

app.get('/about', (_, res) => {
    res.json(aboutInfo);
});

/**
 ## Manejo de errores y puesta en marcha del servidor

 Finalmente, configuramos el servidor para manejar errores inesperados y lo ponemos en marcha.
 */

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => console.log(`Servidor de persistencia corriendo en http://localhost:${PORT}`));
