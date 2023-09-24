import React, {useState} from 'react';
import AboutButton from './AboutButton';
import PreferencesButton from './PreferencesButton';
import PreferencesDropdown from './PreferencesDropdown';

function Menu({preferences, updatePreference}) {
    const [isPreferencesOpen, setPreferencesOpen] = useState(false);

    const handleAboutClick = () => {
        // Implementar funcionalidad para "Acerca de"
    };

    return (
        <div className="menuContainer">
            <AboutButton onClick={handleAboutClick} />
            <h1>Prototipo: Entorno OneFlowStream (OFS)</h1>
            <div className="prefContainer">
                <PreferencesButton onClick={() => setPreferencesOpen(!isPreferencesOpen)}/>
                {isPreferencesOpen &&
                    <PreferencesDropdown preferences={preferences} updatePreference={updatePreference}/>}
            </div>
        </div>
    );
}

export default Menu;
