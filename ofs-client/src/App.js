/**
 # App Principal

 Este archivo define la estructura y comportamiento de nuestra aplicación.
 La idea principal es que los usuarios pueden escribir código en un editor,
 compilarlo enviándolo al servidor y ver el resultado transpilado.

 ## Importaciones

 Necesitamos diversos componentes y funciones auxiliares para que nuestra aplicación funcione correctamente.
 */

import React, {useEffect, useState} from 'react';
import Editor from './components/Editor/Editor';
import Output from './components/Output/Output';
import StatusBar from './components/StatusBar/StatusBar';
import ConsoleArea from './components/ConsoleArea/ConsoleArea';
import Menu from './components/Menu/Menu';
import {compileCodeOnServer, evaluateCodeOnServer, retrievetxt, transFixed, transFixed2} from './api/scripts';
import 'font-awesome/css/font-awesome.min.css'; // Iconos
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
    const [statusBarMessage, setStatusBarMessage] = useState('');
    const [consoleAreaMessage, setConsoleAreaMessage] = useState('');
    const [transpiled, setTranspiled] = useState('');
    const [preferences, setPreferences] = useState({theme: 'light'});
    const [id, setid] = useState('');
    const [filename, setFilename] = useState('');
    const [evaluationResult, setEvaluationResult] = useState('');
    /**
     ### Actualización de Tema

     Este efecto se dispara cada vez que cambian las preferencias de tema del usuario.
     Su propósito es actualizar el tema de la aplicación en función de las preferencias seleccionadas.
     */

    useEffect(() => {
        document.body.setAttribute('data-theme', preferences.theme);
    }, [preferences.theme]);

    /**
     ### Actualizar Preferencias

     Esta función toma una clave y un valor para actualizar las preferencias del usuario.
     */

    const updatePreference = (key, value) => setPreferences(prevPreferences => ({...prevPreferences, [key]: value}));

    /**
     ### Compilar Código

     Cuando el usuario decide compilar su código, esta función se invoca. Envía el código
     actual al servidor y espera una respuesta.
     */

    const handleCompile = async () => {
        console.log("Código a enviar:", filename);

        const compileFunctions = {
            "test_1.ofs": async () => {
                const result = await transFixed();
                setFilename("ofs_test.js");
                setStatusBarMessage(result.success ? 'Código transpilado con éxito.' : result.message || 'Error al comunicarse con el servidor.');
                result.success && setTranspiled(result.content);
            },
            "test_2.ofs": async () => {
                const result = await transFixed2();
                setFilename("ofs_test2.js");
                setStatusBarMessage(result.success ? 'Código transpilado con éxito.' : result.message || 'Error al comunicarse con el servidor.');
                result.success && setTranspiled(result.content);
            },
            default: async () => {
                if (!currentCode || !id) {
                    setStatusBarMessage("Error: ingrese el código a compilar.");
                    return;
                }

                console.log("Código a enviar:", currentCode);
                const result = await compileCodeOnServer(currentCode);
                console.log("Resultado de la compilación:", result);
                setFilename(id + ".js");
                setStatusBarMessage(result.success ? 'Código transpilado con éxito.' : result.message || 'Error al comunicarse con el servidor.');
                result.success && setTranspiled(result.output);
            }
        };
        const compileFunction = compileFunctions[id] || compileFunctions.default;
        await compileFunction();
    };

    /**
     ### Evaluar Código

     Cuando el usuario decide evaluar su código, esta función se invoca. Envía el código
     actual al servidor y espera una respuesta.
     */

    const handleEvaluate = async () => {
        if (!transpiled) {
            setStatusBarMessage("Error: ingrese el código a evaluar.");
        } else {
            try {
                // Realiza la evaluación del código y obtén la respuesta
                const response = await evaluateCodeOnServer(transpiled);
                if (response.success) {
                    // Si la evaluación fue exitosa, actualiza el estado con la respuesta
                    setEvaluationResult(response.output);
                    setStatusBarMessage('Código evaluado con éxito.');
                } else {
                    // Si hubo un error en la evaluación, muestra un mensaje de error
                    setEvaluationResult('');
                    setStatusBarMessage(response.message || 'Error al comunicarse con el servidor.');
                }
            } catch (error) {
                console.error("Error al evaluar el código:", error);
                setEvaluationResult('');
                setStatusBarMessage('Error al comunicarse con el servidor.');
            }
        }
    };

    /**
     ### Renderizar

     Definimos la estructura visual de nuestra aplicación. Se compone de un menú, el editor, la salida transpilada, una barra de estado
     y un área de consola para evaluaciones de codigo.
     */

    return (
        <div className="App">
            <Menu preferences={preferences} updatePreference={updatePreference}/>
            <div className="Code">
                <Editor
                    code={currentCode}
                    setStatusBarMessage={setStatusBarMessage}
                    onCodeChange={setCurrentCode}
                    idchange={setid}
                />
                <Output result={transpiled} filename={filename}/>
            </div>
            <div className="Console">
                <StatusBar message={statusBarMessage}/>
                <ConsoleArea message={consoleAreaMessage} onCompile={handleCompile} onEvaluate={handleEvaluate}
                             evaluationResult={evaluationResult}/>
            </div>
        </div>
    );
}

export default App;
