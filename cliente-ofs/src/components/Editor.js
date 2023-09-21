import React, { useState } from 'react';
import { saveScript, retrieveScript } from '../api/scripts';

const Editor = ({ setConsoleMessage, onCodeChange }) => {
  const [code, setCode] = useState('');
  const [scriptName, setScriptName] = useState('');

  const handleSaveScript = async () => {
    const result = await saveScript(scriptName, code);
    setConsoleMessage(result.message);
  };

  const handleRetrieveScript = async () => {
    const result = await retrieveScript(scriptName);
    if (result.success) {
        setCode(result.code);
        onCodeChange(result.code);  // Actualiza currentCode en App.js
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
            onChange={(e) => {
              setCode(e.target.value);
              onCodeChange(e.target.value);  // Notifica a App.js del cambio
            }}
            rows="10"
            cols="50"
        ></textarea>
    </div>
  );
};

export default Editor;
