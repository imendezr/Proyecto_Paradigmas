import React, { useState } from 'react';
import axios from 'axios';

const Editor = ({ onExecute }) => {
  const [code, setCode] = useState('');
  const [scriptName, setScriptName] = useState('');
  const [message, setMessage] = useState('');

  const saveScript = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/save', {
            scriptName: scriptName,
            code: code
        });

        if (response.data.success) {
            setMessage("Script guardado con éxito.");
        } else {
            setMessage(response.data.message);
        }
    } catch (error) {
        console.error("Error al guardar el script:", error);
        setMessage("Error al guardar el script.");
    }
  };

  const retrieveScript = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/api/retrieve/${scriptName}`);

        if (response.data.success) {
            setCode(response.data.code);
            setMessage("Script recuperado con éxito.");
        } else {
            setMessage(response.data.message);
        }
    } catch (error) {
        console.error("Error al recuperar el script:", error);
        setMessage("Error al recuperar el script.");
    }
  };

  return (
    <div>
      <div>
        <input
          value={scriptName}
          onChange={(e) => setScriptName(e.target.value)}
          placeholder="Nombre del Script"
        />
        <button onClick={saveScript}>Guardar Script</button>
        <button onClick={retrieveScript}>Recuperar Script</button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
      ></textarea>
      <button onClick={() => onExecute(code)}>Ejecutar</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export const sendCodeToServer = async (codeToSend) => {
    try {
        const response = await axios.post('http://localhost:3001/api/execute', {
            code: codeToSend
        });
        
        if (response.data.success) {
            return response.data.output;
        } else {
            // Puedes añadir lógica adicional para manejar errores específicos aquí
            return "Error al procesar el código.";
        }

    } catch (error) {
        console.error("Error al enviar el código al servidor:", error);
        return "Error al comunicarse con el servidor.";
    }
};

export default Editor;
