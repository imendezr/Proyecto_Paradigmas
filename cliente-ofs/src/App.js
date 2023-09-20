import React, { useState } from 'react';
import Editor from './components/Editor';
import { sendCodeToServer } from './components/Editor';
import Output from './components/Output';
import './App.css';  // Puedes mantener esta línea si todavía quieres aplicar los estilos de App.css

function App() {
  const [output, setOutput] = useState('');

  const handleExecute = async (code) => {
    const result = await sendCodeToServer(code);
    setOutput(result);
  };

  return (
    <div className="App">
      <h1>Entorno Prototipo para el Lenguaje OneFlowStream (OFS)</h1>
      <Editor onExecute={handleExecute} />
      <Output result={output} />
    </div>
  );
}

export default App;
