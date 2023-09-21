import React, { useState } from 'react';
import MenuButton from './MenuButton';
import PreferencesButton from './PreferencesButton';
import PreferencesDropdown from './PreferencesDropdown';

function Menu({ preferences, updatePreference }) {
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);
  
  return (
    <div className="menuContainer">
      <MenuButton href="#about" label="Acerca de" />
      <h1>Prototipo: Entorno OneFlowStream (OFS)</h1>
      <div className="prefContainer">
        <PreferencesButton onClick={() => setPreferencesOpen(!isPreferencesOpen)} />
        {isPreferencesOpen && <PreferencesDropdown preferences={preferences} updatePreference={updatePreference} />}
      </div>
    </div>
  );
}

export default Menu;
export { MenuButton };
