/**
 # Componente Editor

 El componente Editor permite a los usuarios escribir, guardar y recuperar scripts. Los scripts se guardan bajo un nombre
 especificado, y se pueden recuperar posteriormente a través de ese mismo nombre.

 ## Importaciones

 Utilizamos funciones auxiliares de la API para guardar y recuperar scripts.
 */

import React, {useState} from 'react';
import {retrieveScript, saveScript} from '../../api/scripts';

/**
 ## Definición del Componente

 El editor recibe dos funciones del componente principal (`App`):
 - `setConsoleMessage`: Actualizar mensajes en la consola.
 - `onCodeChange`: Notificar cambios en el código.

 Dentro del componente, gestionamos dos estados principales:
 - `code`: El código actual que el usuario ha escrito o recuperado.
 - `scriptName`: El nombre bajo el cual se guardará o se ha guardado un script.
 */

const Editor = ({ code, setConsoleMessage, onCodeChange }) => {
    const [scriptName, setScriptName] = useState('');

    /**
     ### Guardar Script

     Esta función guarda el código actual bajo el nombre especificado y muestra un mensaje en la consola.
     */

    const handleSaveScript = async () => {
        const result = await saveScript(scriptName, code);
        setConsoleMessage(result.message);
    };

    /**
     ### Recuperar Script

     Esta función recupera un script por su nombre y actualiza el código del editor.
     También notifica al componente principal (`App`) de los cambios.
     */

    const handleRetrieveScript = async () => {
        const result = await retrieveScript(scriptName);
        if (result.success) {
            onCodeChange(result.code);
        }
        setConsoleMessage(result.message);
    };

    return (
        <div>
            <div>
                <input
                    value={scriptName}
                    onChange={(e) => setScriptName(e.target.value)}
                    placeholder="Nombre del script"
                />
                <button onClick={handleSaveScript}>Guardar</button>
                <button onClick={handleRetrieveScript}>Recuperar</button>
            </div>
            <textarea
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                rows="10"
                cols="50"
            ></textarea>
        </div>
    );
};

export default Editor;
