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

app.use(express.json()); // Añade el middleware para parsear JSON

app.get('/', (req, res) => {
  res.send('Servidor OFS en funcionamiento!');
});

function emulateOFSExecution(code) {
    // Por ahora, solo retornamos el mismo código con una notación ficticia.
    // En el futuro, aquí es donde procesarías el código OFS y lo convertirías a JS.
    return `Emulated OFS: ${code}`;
}

app.post('/api/execute', (req, res) => {
    const { code } = req.body;

    const emulatedResult = emulateOFSExecution(code);

    res.json({ 
        success: true,
        input: code,
        output: emulatedResult
    });
});

let scriptsDB = {};

app.post('/api/save', (req, res) => {
    const { scriptName, code } = req.body;

    // Guarda el código en la estructura
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
