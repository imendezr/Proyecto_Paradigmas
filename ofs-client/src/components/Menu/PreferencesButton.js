/**
 # Componente PreferencesButton

 Representa un botón diseñado específicamente para acceder a las preferencias del usuario.

 ## Propiedades

 - `onClick`: Una función que se invoca cuando el botón es presionado.

 ## Vista

 Visualmente, el componente es un botón etiquetado con el texto "Preferencias" y tiene un estilo particular.
 */

import React from 'react';

const PreferencesButton = ({onClick}) => {
    return (
        <button className="preferencesButton" onClick={onClick}>Preferencias</button>
    );
}

export default PreferencesButton;
