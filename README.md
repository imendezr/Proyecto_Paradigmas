# Integrantes:
Isaac Méndez Rodríguez
Diego Sánchez Jiménez
Fabio Villalobos Pacheco

# OFS - Instrucciones de Construcción y Ejecución# Proyecto_Paradigmas
OneFlowStream (OFS)
https://drive.google.com/file/d/1VAY1MWD2CDmhjzu86sRXkz75tA5AXN_t/view

# Build & Run:

## Requisitos previos:
- Tener instalado Node.js y npm.

## Instrucciones para construir y ejecutar:

1. **Instalación de Módulos**:
    - En la raíz del proyecto, ejecutar 'install-modules.bat' si aún no ha descargado los módulos.

2. **Construcción para Producción**:
    - Si necesita construir el cliente para producción, ejecute 'create-build.bat'. Esto generará una carpeta `build` con todos los archivos optimizados para producción.

3. **Servir el Cliente Construido**:
    - Una vez que haya construido el cliente para producción (paso 2), puede servir la carpeta `build` utilizando cualquier servidor web. Una opción simple es usar Express:
        - Asegúrese de tener Express instalado con `npm install express` en CMD.
        - Ejecute el archivo `start-production.bat` para iniciar todos los servidores y servir el cliente construido.
		
## Cambiar Puerto de ejecución:
- Si necesita cambiar el puerto del cliente o servidor, puede hacerlo modificando el archivo 'config.js' ubicado en `ofs-client\src`.


# Development:
1. Usar 'install-modules.bat' en la raiz del proyecto. En caso de no tener descargado los modulos.
2. Borrar o mover fuera del directorio del proyecto las carpetas "node_modules" del cliente y servidores antes de hacer un commit.
3. La aplicacion se ejecuta usando 'start-development.bat' en la raiz del proyecto.
4. Para detener el cliente o el servidor use CTRL + C. Y + Enter.
5. Si hace un cambio en algún servidor, debe reiniciarlo para no mostrar errores.
6. En caso de hacer una Build ('npm run build'), borrarla o moverla fuera del directorio del proyecto antes de hacer un commit.