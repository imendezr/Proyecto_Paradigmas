/**
 # Componente Output

 El componente Output es una representación visual de los resultados, como el código transpilado.

 ## Propiedades

 - `result`: El resultado o el código transpilado que se mostrará.

 ## Vista

 Se utiliza un área de texto de solo lectura para mostrar el resultado.
 */

import React from 'react';

const Output = ({ result }) => {
    return (
        <div>
            <textarea readOnly value={result} rows="10" cols="50"></textarea>
        </div>
    );
};

export default Output;
