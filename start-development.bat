@echo off
REM Iniciar el servidor de persistencia
start "Persistence Server" cmd /k "cd ofs-persistence-server && npm start"
REM Iniciar el servidor de lógica OFS
start "Logic Server" cmd /k "cd ofs-logic-server && npm start"
REM Iniciar el servidor principal
start "Main Server" cmd /k "cd ofs-main-server && npm start"
timeout /T 10
REM Iniciar el cliente
start "React App" cmd /k "cd ofs-client && npm start"
exit
