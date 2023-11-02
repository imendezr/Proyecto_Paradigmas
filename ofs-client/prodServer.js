const express = require('express');
const path = require('path');
const config = require('./src/config');

const app = express();
const PORT = process.env.PORT || config.CLIENT_PORT;

// Sirve los archivos estáticos desde la carpeta build
app.use(express.static(path.join(__dirname, 'build')));

// Maneja cualquier otra ruta con index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor de producción (build) corriendo en el puerto ${PORT}`);
});
