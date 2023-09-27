/**
 # Componente Output

 El componente Output es una representación visual de los resultados, como el código transpilado.

 ## Propiedades

 - `result`: El resultado o el código transpilado que se mostrará.

 ## Vista

 Se utiliza un área de texto de solo lectura para mostrar el resultado.
 */

import React, {useEffect, useRef} from 'react';

const Output = ({ result, filename }) => {
    // Referencia al textarea y a los números de línea
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    // Función para manejar el desplazamiento del textarea y sincronizar con los números de línea
    const handleScroll = () => {
        const textarea = textareaRef.current;
        const lineNumbers = lineNumbersRef.current;
        lineNumbers.scrollTop = textarea.scrollTop;
    };

    // Función para obtener los números de línea basados en el resultado
    const getLineNumbers = () => {
        // Divide el resultado en líneas y crea elementos para cada número de línea
        return result.split('\n').map((_, index) => (
            <div key={index + 1} className="line-number">{index + 1}</div>
        ));
    };

    // Efecto que se ejecuta al cargar o cambiar el resultado
    useEffect(() => {
        const textarea = textareaRef.current;
        const lineNumbers = lineNumbersRef.current;

        // Función para actualizar la altura de los números de línea según la altura del textarea
        const updateLineNumbersHeight = () => {
            const textareaComputedStyle = getComputedStyle(textarea);
            lineNumbers.style.height = textareaComputedStyle.height;
        };

        updateLineNumbersHeight(); // Actualiza la altura inicialmente

        // Agrega event listeners para actualizar la altura y sincronizar el desplazamiento
        textarea.addEventListener('input', updateLineNumbersHeight);
        textarea.addEventListener('scroll', handleScroll);

        // Limpia los event listeners cuando el componente se desmonta para evitar pérdidas de memoria
        return () => {
            textarea.removeEventListener('input', updateLineNumbersHeight);
            textarea.removeEventListener('scroll', handleScroll);
        };
    }, [result]); // El efecto se ejecuta cada vez que el resultado cambia

    return (
        <div className="TA">
            <div>
                <input
                    className="fieldNamejs"
                    value={filename}
                    placeholder=""
                    readOnly // Hace que este input sea de solo lectura para mostrar el nombre del archivo
                />
            </div>
            <div className="line-numbersTA" ref={lineNumbersRef}>
                {getLineNumbers()} {/* Renderiza los números de línea */}
            </div>
            <textarea
                ref={textareaRef}
                readOnly // Hace que el textarea sea de solo lectura
                value={result}
                onScroll={handleScroll} // Maneja el evento de desplazamiento
                rows="10"
                cols="50"
            ></textarea>
        </div>
    );
};

export default Output;
