const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = path.join(__dirname, 'scripts');

(async () => {
    // Conectarse a la base de datos
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'ofs_db',
        password: 'root' // Cambia por tu contraseña
    });

    // Leer todos los archivos en el directorio de scripts
    const scriptFiles = fs.readdirSync(SCRIPTS_DIR);

    for (const file of scriptFiles) {
        const content = fs.readFileSync(path.join(SCRIPTS_DIR, file), 'utf8');
        const id = path.basename(file, '.txt'); // Usamos el nombre del archivo como ID

        // Insertar o actualizar en la base de datos
        await connection.execute("INSERT INTO scripts (id, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = ?", [id, content, content]);
    }

    console.log('Scripts migrados a la base de datos.');
    await connection.end();
})();
