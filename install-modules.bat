@echo off
REM Instalar dependencias
echo Instalando dependencias para ofs-client...
start cmd /c "cd ofs-client && npm install && echo Listo. && pause"
echo Presione Enter para continuar con la siguiente instalacion...
pause
echo ---------------------------------

echo Instalando dependencias para ofs-main-server...
start cmd /c "cd ofs-main-server && npm install && echo Listo. && pause"
echo Presione Enter para continuar con la siguiente instalacion...
pause
echo ---------------------------------

echo Instalando dependencias para ofs-logic-server...
start cmd /c "cd ofs-logic-server && npm install && echo Listo. && pause"
echo Presione Enter para continuar con la siguiente instalacion...
pause
echo ---------------------------------

echo Instalando dependencias para ofs-persistence-server...
start cmd /c "cd ofs-persistence-server && npm install && echo Listo. && pause"
echo Todas las instalaciones han terminado. Presione Enter para salir.
pause
