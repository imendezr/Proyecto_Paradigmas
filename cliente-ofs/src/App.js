import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import ScriptManager from './components/Editor/ScriptManager';
import Output from './components/Output/Output';
import Menu, { MenuButton } from './components/Menu/Menu';
import PreferencesDropdown from './components/Menu/PreferencesDropdown';
import { sendCodeToServer } from './api/scripts'; 
import './App.css';

function App() {
  const [currentCode, setCurrentCode] = useState('');
  const [transpiled, setTranspiled] = useState('');
  const [consoleMessage, setConsoleMessage] = useState('');
  const [preferences, setPreferences] = useState({
    theme: 'light',
  });

  const updatePreference = (key, value) => {
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      [key]: value
    }));
  };

  const handleCodeChange = (updatedCode) => {
  setCurrentCode(updatedCode);
  };
  
  const handleCompile = async () => {
  try {
    const result = await sendCodeToServer(currentCode);

    if (result.success) {
      setTranspiled(result.transpiledCode);
      setConsoleMessage('Código transpilado con éxito.');
    } else {
      setConsoleMessage(result.message);
    }
  } catch (error) {
    setConsoleMessage('Error al comunicarse con el servidor.');
  }
};

  return (
    <div className="App">
      <Menu preferences={preferences} updatePreference={updatePreference} />
      <div className="Code">
        <div className="EA">
          <ScriptManager />
          <Editor 
            setConsoleMessage={setConsoleMessage} 
            onCodeChange={handleCodeChange}  
			code={currentCode}
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
