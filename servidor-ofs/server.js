const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing
const app = express();
const PORT = 3001;

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
    // Por ahora, solo retorna el mismo código con una notación ficticia.
    // En el futuro, aquí se procesará el código OFS y se convertirá a JS.
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

let scriptsDB = {};

app.post('/api/save', (req, res) => {
    const { scriptName, code } = req.body;

    // Guarda el código en la estructura. Por el momento no hay BD por detrás.
    scriptsDB[scriptName] = code;

    res.json({
        success: true,
        message: `Script ${scriptName} guardado con éxito.`
    });
});

app.get('/api/retrieve/:scriptName', (req, res) => {
    const { scriptName } = req.params;

    if (scriptsDB[scriptName]) {
        res.json({
            success: true,
            code: scriptsDB[scriptName]
        });
    } else {
        res.status(404).json({
            success: false,
            message: `Script ${scriptName} no encontrado.`
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
