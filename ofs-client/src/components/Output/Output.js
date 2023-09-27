/**
 # Componente Output

 El componente Output es una representación visual de los resultados, como el código transpilado.

 ## Propiedades

 - `result`: El resultado o el código transpilado que se mostrará.

 ## Vista

 Se utiliza un área de texto de solo lectura para mostrar el resultado.
 */

import React, {useEffect, useRef} from 'react';


const Output = ({result, filename}) => {
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    const handleScroll = () => {
        const textarea = textareaRef.current;
        const lineNumbers = lineNumbersRef.current;
        lineNumbers.scrollTop = textarea.scrollTop;
    };

    const getLineNumbers = () => {
        return result.split('\n').map((_, index) => (
            <div key={index + 1} className="line-number">{index + 1}</div>
        ));
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        const lineNumbers = lineNumbersRef.current;

        const updateLineNumbersHeight = () => {
            const textareaComputedStyle = getComputedStyle(textarea);
            lineNumbers.style.height = textareaComputedStyle.height;
        };

        updateLineNumbersHeight();

        textarea.addEventListener('input', updateLineNumbersHeight);
        textarea.addEventListener('scroll', handleScroll);

        return () => {
            textarea.removeEventListener('input', updateLineNumbersHeight);
            textarea.removeEventListener('scroll', handleScroll);
        };
    }, [result]);

    return (
        <div className="TA">
            <div>
                <input className="fieldNamejs"
                       value={filename}
                       placeholder=""
                       readOnly
                />
            </div>
            <div className="line-numbersTA" ref={lineNumbersRef}>
                {getLineNumbers()}
            </div>
            <textarea
                ref={textareaRef}
                readOnly
                value={result}
                onScroll={handleScroll}
                rows="10"
                cols="50"
            ></textarea>
        </div>
    );
};

export default Output;
