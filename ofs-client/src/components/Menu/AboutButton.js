/**
 # Componente AboutButton

 Este componente representa un botón que puede ser presionado para acceder a la sección "Acerca de".

 ## Propiedades

 - `onClick`: Una función que se invoca cuando el botón es presionado.

 ## Vista

 El componente visualmente es un botón etiquetado con el texto "Acerca de".
 */

import React from 'react';

const AboutButton = ({onClick}) => {
    return (
        <button onClick={onClick}>Acerca de</button>
    );
}

export default AboutButton;
