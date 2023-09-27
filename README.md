# OFS - Instrucciones de Construcción y Ejecución# Proyecto_Paradigmas
OneFlowStream (OFS)
https://drive.google.com/file/d/1VAY1MWD2CDmhjzu86sRXkz75tA5AXN_t/view

# Build & Run:

## Requisitos previos:
- Tener instalado Node.js y npm.

## Instrucciones para construir y ejecutar:

1. *Configuración general:*
    - Navega al directorio raíz del proyecto.

2. *Cliente (Frontend):*
    - Navega a la carpeta `ofs-client`.
    - Ejecuta `npm install` para instalar las dependencias.

3. *Servidores (Backend):*
    - Realiza los siguientes pasos para cada uno de los servidores (`ofs-main-server`, `ofs-logic-server`, `ofs-persistence-server`):
        - Navega a la carpeta del servidor.
        - Ejecuta `npm install` para instalar las dependencias.

4. *Construcción para Producción:*
    - Si necesitas construir el cliente para producción, navega a `ofs-client` y ejecuta `npm run build`. Esto generará una carpeta `build` con todos los archivos optimizados para producción.

5. *Servir el Cliente Construido:*
    - Una vez que hayas construido el cliente para producción (paso 4), puedes servir la carpeta `build` usando cualquier servidor web. Una opción simple es usar Express:
        - Asegúrate de tener Express instalado globalmente con `npm install -g express`.
        - Ejecuta `node server.js` para servir el cliente en el puerto 3000 (o cualquier otro puerto especificado en `process.env.PORT`).

# Development:
1. Usar 'npm install' en la carpeta de cada servidor y cliente. En caso de no tener descargado los modulos.
2. Borrar o mover fuera del directorio del proyecto las carpetas "node_modules" del cliente y servidores antes de hacer un commit.
3. La aplicacion se ejecuta usando 'npm start' en cada uno de los servidores y cliente.
4. Para detener la aplicación o servidor use CTRL + C. Y + Enter.
5. Si hace un cambio en algún servidor, debe reiniciarlo para no mostrar errores.
6. En caso de hacer una Build ('npm run build'), borrarla o moverla fuera del directorio del proyecto antes de hacer un commit.