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

app.post('/api/execute', (req, res) => {
    const { code } = req.body;

    // Supongamos que en el futuro procesarás el código aquí.
    const processedCode = code; // Por ahora solo es una simulación

    res.json({ 
        success: true,
        input: code,
        output: `El código enviado es: ${processedCode}`
    });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
