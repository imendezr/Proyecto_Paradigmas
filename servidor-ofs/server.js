const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing
const fs = require('fs');       // Importando el módulo fs
const path = require('path');   // Importando el módulo path

const app = express();
const PORT = 3001;

// Directorio para los scripts
const SCRIPTS_DIR = path.join(__dirname, 'scripts');

// Crea el directorio si no existe
if (!fs.existsSync(SCRIPTS_DIR)) {
    fs.mkdirSync(SCRIPTS_DIR);
}

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite las solicitudes desde este origen
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json()); // Middleware para parsear JSON

app.get('/', (req, res) => {
  res.send('Servidor OFS en funcionamiento!');
});

function emulateOFSExecution(code) {
    // Por el momento retorna el mismo código con una notación.
    // En el futuro procesará el código OFS y lo convierte a JS.
    return `Emulated OFS: ${code}`;
}

app.post('/compile', (req, res) => {
    const { code } = req.body;

    console.log("Código recibido para compilar:", code); // Permite saber si el código llega al servidor

    const timestamp = new Date().toISOString();
    const transpiledCode = `${timestamp}\n${code}`;

    res.json({ 
        success: true,
        input: code,
        output: transpiledCode
    });
});

function saveToFile(scriptName, code) {
    fs.writeFileSync(path.join(SCRIPTS_DIR, `${scriptName}.txt`), code);
}

function readFromFile(scriptName) {
    if (fs.existsSync(path.join(SCRIPTS_DIR, `${scriptName}.txt`))) {
        return fs.readFileSync(path.join(SCRIPTS_DIR, `${scriptName}.txt`), 'utf8');
    }
    return null;
}

app.post('/api/save', (req, res) => {
    const { scriptName, code } = req.body;

    if (!scriptName || !code || typeof scriptName !== "string" || typeof code !== "string") {
        return res.status(400).json({
            success: false,
            message: "Nombre del script o código no válido."
        });
    }

    try {
        saveToFile(scriptName, code);
        res.json({
            success: true,
            message: `Script ${scriptName} guardado con éxito.`
        });
    } catch (error) {
        console.error("Error al guardar el script:", error);
        res.status(500).json({
            success: false,
            message: "Error al guardar el script."
        });
    }
});

app.get('/api/retrieve/:scriptName', (req, res) => {
    const { scriptName } = req.params;

    try {
        const code = readFromFile(scriptName);
        if (code) {
            res.json({
                success: true,
                code: code
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Script ${scriptName} no encontrado.`
            });
        }
    } catch (error) {
        console.error("Error al recuperar el script:", error);
        res.status(500).json({
            success: false,
            message: "Error al recuperar el script."
        });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
