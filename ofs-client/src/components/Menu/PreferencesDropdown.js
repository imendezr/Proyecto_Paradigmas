/**
 # Componente PreferencesDropdown

 Es un menú desplegable que permite al usuario modificar sus preferencias, como cambiar el tema de la interfaz.

 ## Propiedades

 - `preferences`: Las preferencias actuales del usuario.
 - `updatePreference`: Una función que permite actualizar un valor particular de las preferencias.

 ## Vista

 Se inicia con una opción para cambiar el tema a oscuro. Pueden agregarse más opciones según las necesidades.
 */

import React from 'react';

const PreferencesDropdown = ({preferences, updatePreference}) => {
    const handleThemeChange = (event) => {
        const theme = event.target.checked ? 'dark' : 'light';
        updatePreference('theme', theme);
    }

    return (
        <div className="preferencesDropdown">
            <label>
                <input
                    type="checkbox"
                    checked={preferences.theme === 'dark'}
                    onChange={handleThemeChange}
                />
                Tema oscuro
            </label>
            {/* Aquí se agregan más controles de preferencias */}
        </div>
    );
}

export default PreferencesDropdown;
