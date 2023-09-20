// components/Editor.js

import React, { useState } from 'react';
import axios from 'axios';

const Editor = ({ onExecute }) => {
  const [code, setCode] = useState('');

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
      ></textarea>
      <button onClick={() => onExecute(code)}>Ejecutar</button>
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
