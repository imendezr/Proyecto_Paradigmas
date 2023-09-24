/**
 # App Principal

 Este archivo define la estructura y comportamiento de nuestra aplicación.
 La idea principal es que los usuarios pueden escribir código en un editor,
 compilarlo enviándolo al servidor y ver el resultado transpilado.

 ## Importaciones

 Necesitamos diversos componentes y funciones auxiliares para que nuestra aplicación funcione correctamente.
 */

import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import Output from './components/Output/Output';
import Menu from './components/Menu/Menu';
import { sendCodeToServer } from './api/scripts';
import './App.css';

/**
 ## Componente App

 El componente principal que representa nuestra aplicación.
 */

function App() {

    /**
     ### Estados

     - `currentCode`: Guarda el código que el usuario escribe en el editor.
     - `transpiled`: Muestra el código transpilado que viene del servidor.
     - `consoleMessage`: Muestra mensajes útiles para el usuario.
     - `preferences`: Configuraciones personalizables de la aplicación, como el tema.
     */

    const [currentCode, setCurrentCode] = useState('');
    const [transpiled, setTranspiled] = useState('');
    const [consoleMessage, setConsoleMessage] = useState('');
    const [preferences, setPreferences] = useState({ theme: 'light' });

    /**
     ### Actualizar Preferencias

     Esta función toma una clave y un valor para actualizar las preferencias del usuario.
     */

    const updatePreference = (key, value) => setPreferences(prevPreferences => ({ ...prevPreferences, [key]: value }));

    /**
     ### Compilar Código

     Cuando el usuario decide compilar su código, esta función se invoca. Envía el código
     actual al servidor y espera una respuesta.
     */

    const handleCompile = async () => {
        console.log("Código a enviar:", currentCode);
        const result = await sendCodeToServer(currentCode);
        console.log("Resultado de la compilación:", result);
        setConsoleMessage(result.success ? 'Código transpilado con éxito.' : result.message || 'Error al comunicarse con el servidor.');
        result.success && setTranspiled(result.output);
    };

    /**
     ### Renderizar

     Definimos la estructura visual de nuestra aplicación. Se compone de un menú, el editor, la salida transpilada
     y un área de consola para mensajes.
     */

    return (
        <div className="App" data-theme={preferences.theme}>
            <Menu preferences={preferences} updatePreference={updatePreference} />
            <div className="Code">
                <div className="EA">
                    <Editor
                        code={currentCode}
                        setConsoleMessage={setConsoleMessage}
                        onCodeChange={setCurrentCode}
                    />
                </div>
                <div className="TA">
                    <Output result={transpiled} />
                </div>
            </div>
            <div className="Console">
                <div className="RA">
                    <button onClick={handleCompile}>Compilar</button>
                    <textarea readOnly value={consoleMessage} rows="3"></textarea>
                </div>
            </div>
        </div>
    );
}

export default App;
