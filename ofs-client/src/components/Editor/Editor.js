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
 - `setStatusBarMessage`: Actualizar mensajes en la barra de estado.
 - `onCodeChange`: Notificar cambios en el código.

 Dentro del componente, gestionamos dos estados principales:
 - `code`: El código actual que el usuario ha escrito o recuperado.
 - `id`: El nombre bajo el cual se guardará o se ha guardado un script.
 */

const Editor = ({code, setStatusBarMessage, onCodeChange}) => {
    const [id, setId] = useState('');

    /**
     ### Guardar Script

     Esta función guarda el código actual bajo el nombre especificado y muestra un mensaje en la barra de estado.
     */

    const handleSaveScript = async () => {
        !id ? setStatusBarMessage("Error: ingrese un nombre para el script.") : (async () => {
            const result = await saveScript(id, code);
            setStatusBarMessage(result.message);
        })();
    };

    /**
     ### Recuperar Script

     Esta función recupera un script por su nombre y actualiza el código del editor.
     También notifica al componente principal (`App`) de los cambios.
     */

    const handleRetrieveScript = async () => {
        !id ? setStatusBarMessage("Error: ingrese un nombre de script para recuperar.") : (async () => {
            const result = await retrieveScript(id);
            result.success && onCodeChange(result.code);
            setStatusBarMessage(result.message);
        })();
    };

    return (
        <div className="EA">
            <div>
                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
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
