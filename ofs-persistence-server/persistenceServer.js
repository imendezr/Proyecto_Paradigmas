/**
 # Configuración del servidor de persistencia OFS

 Este documento describe cómo el servidor de persistencia de OFS maneja
 las solicitudes relacionadas con la persistencia de scripts.

 Para empezar, primero importamos las bibliotecas necesarias:
 */

const express = require('express');
const cors = require('cors');
const aboutInfo = require('./about.json');
const keywordsinfo = require('./predefinedWords.json');
const {PERSISTENCE_SERVER_PORT, MAIN_SERVER_PORT} = require('../ofs-client/src/config');

/**
 ## Configuración BD del servidor
 */

const mysql = require('mysql2/promise');
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ofs_db'
};

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

// Capa de abstracción para operaciones CRUD
const dbLayer = {
    async save(id, code) {
        const connection = await mysql.createConnection(DB_CONFIG);
        await connection.execute('REPLACE INTO scripts (id, code) VALUES (?, ?)', [id, code]);
        await connection.end();
    },
    async retrieve(id) {
        const connection = await mysql.createConnection(DB_CONFIG);
        const [rows] = await connection.execute('SELECT code FROM scripts WHERE id = ?', [id]);
        await connection.end();
        if (rows.length > 0) {
            return rows[0].code;
        }
        return null;
    }
};

/**
 ## Rutas del servidor

 Definimos las rutas que manejarán las operaciones de persistencia.
 */

app.post('/script/save', async (req, res) => {
    const {id, code} = req.body;
    try {
        await dbLayer.save(id, code);
        res.json({success: true, message: `Script ${id} guardado con éxito.`});
    } catch (error) {
        res.status(500).json({success: false, message: "Error al guardar el script."});
    }
});

app.get('/script/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const code = await dbLayer.retrieve(id);
        code ? res.json({success: true, code})
            : res.status(404).json({success: false, message: `Script ${id} no encontrado.`});
    } catch (error) {
        res.status(500).json({success: false, message: "Error al recuperar el script."});
    }
});

app.get('/getTxt', async (req, res) => {
    try {
        const code = await dbLayer.retrieve('ra_fake');
        if (code) {
            res.json({success: true, content: code});
        } else {
            res.status(404).json({error: 'No se encontró el script ra_fake.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error al recuperar el script ra_fake de la base de datos.'});
    }
});

app.get('/fixed', async (req, res) => {
    try {
        const timestamp = new Date().toISOString();
        const code = await dbLayer.retrieve('ofs_test.js');
        const out = code ? `//${timestamp}\n${code}` : null;
        if (out) {
            res.json({success: true, content: out});
        } else {
            res.status(404).json({error: 'No se encontró el script ofs_test.js.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error al recuperar el script ofs_test.js de la base de datos.'});
    }
});

app.get('/fixed2', async (req, res) => {
    try {
        const timestamp = new Date().toISOString();
        const code = await dbLayer.retrieve('ofs_test2.js');
        const out = code ? `//${timestamp}\n${code}` : null;
        if (out) {
            res.json({success: true, content: out});
        } else {
            res.status(404).json({error: 'No se encontró el script ofs_test2.js.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error al recuperar el script ofs_test2.js de la base de datos.'});
    }
});

app.get('/keywords', async (req, res) => {
    res.json(keywordsinfo);
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

app.listen(PERSISTENCE_SERVER_PORT, () => console.log(`Servidor de persistencia corriendo en http://localhost:${PERSISTENCE_SERVER_PORT}`));
