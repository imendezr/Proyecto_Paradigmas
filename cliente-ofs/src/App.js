import React, { useState } from 'react';
import Editor from './components/Editor';
import Output from './components/Output';
import { sendCodeToServer } from './api/scripts'; 
import './App.css';

function PreferencesDropdown({ preferences, updatePreference }) {
  return (
    <div className="preferencesDropdown">
      <label>
        <input 
          type="checkbox" 
          checked={preferences.theme === 'dark'} 
          onChange={(e) => updatePreference('theme', e.target.checked ? 'dark' : 'light')} 
        />
        Tema oscuro
      </label>
      {/* Aquí se agregan más controles de preferencias */}
    </div>
  );
}

function Menu({ preferences, updatePreference }) {
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);

   return (
    <div className="menuContainer">
      <button href="#about">Acerca de</button>
      <h1>Prototipo: Entorno OneFlowStream (OFS)</h1>
      <div className="prefContainer">
        <button className="preferencesButton" onClick={() => setPreferencesOpen(!isPreferencesOpen)}>Preferencias</button>
        {isPreferencesOpen && <PreferencesDropdown preferences={preferences} updatePreference={updatePreference} />}
      </div>
    </div>
  );
}

function App() {
  const [currentCode, setCurrentCode] = useState('');
  const [output, setOutput] = useState('');
  const [transpiled, setTranspiled] = useState('');  // Estado para la transpilación
  const [consoleMessage, setConsoleMessage] = useState(''); // Mensaje en consola RA
  const [preferences, setPreferences] = useState({
    theme: 'light',
  });

  //Función para actualizar una preferencia
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
          <Editor 
            setConsoleMessage={setConsoleMessage} 
            onCodeChange={handleCodeChange}  // Pasa la función callback
          />
        </div>
        <div className="TA">
          <Output result={transpiled} />
        </div>
      </div>
      <div className="Console">
                <div className="RA">
				<div>
					<button onClick={handleCompile}>Compilar</button>
				</div>
                    <textarea readOnly value={consoleMessage} rows="3"></textarea>
                </div>
            </div>
    </div>
  );
}

export default App;
