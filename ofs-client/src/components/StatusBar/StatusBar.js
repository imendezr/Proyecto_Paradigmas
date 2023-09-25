/**
 # StatusBar Component

 Este componente representa la barra de estado donde se mostrarán mensajes de estado útiles para el usuario.

 ## Propiedades

 - `message`: Mensaje a mostrar en la barra de estado.
 */

import React from 'react';

const StatusBar = ({message}) => {
    return (
        <div className="StatusBar">
            <textarea readOnly value={message}></textarea>
        </div>
    );
};

export default StatusBar;
