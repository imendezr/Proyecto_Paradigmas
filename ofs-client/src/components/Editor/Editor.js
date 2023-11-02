/**
 # Componente Editor

 El componente Editor permite a los usuarios escribir, guardar y recuperar scripts. Los scripts se guardan bajo un nombre
 especificado, y se pueden recuperar posteriormente a través de ese mismo nombre.

 ## Importaciones

 Utilizamos funciones auxiliares de la API para guardar y recuperar scripts.
 */


import {keywords, retrieveScript, saveScript} from '../../api/scripts';
import React, {useEffect, useRef, useState} from 'react';

/**
 ## Definición del Componente

 El editor recibe dos funciones del componente principal (`App`):
 - `setStatusBarMessage`: Actualizar mensajes en la barra de estado.
 - `onCodeChange`: Notificar cambios en el código.
 - `idchange`: Notificar cambios en el el id del archivo.

 Dentro del componente, gestionamos dos estados principales:
 - `code`: El código actual que el usuario ha escrito o recuperado.
 - `id`: El nombre bajo el cual se guardará o se ha guardado un script.
 */

const Editor = ({code, setStatusBarMessage, onCodeChange, idchange}) => {
    const [id, setId] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
    const LineWordCursorInfo = ({ code }) => {
        const [lineCount, setLineCount] = useState(0);
        const [wordCount, setWordCount] = useState(0);


        useEffect(() => {
            // Actualiza la cuenta de líneas y palabras cuando cambia el código
            const lines = code.split('\n');
            setLineCount(lines.length);

            const words = code.split(/\s+/).filter(Boolean);
            setWordCount(words.length);
        }, [code]);

        return (
            <div className="line-word-cursor-info">
                <p>líneas: {lineCount} Palabras: {wordCount}  Columna {cursorPosition.column}</p>
            </div>
        );
    };

    const handleCursorPosition = (e) => {
        const textarea = e.target;
        const cursorStart = textarea.selectionStart;
        const lines = textarea.value.split('\n');
        let currentLine = 0;

        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + 1; // +1 para contar el carácter de salto de línea
            if (cursorStart < currentLine + lineLength) {
                const column = cursorStart - currentLine + 1;
                const line = i + 1;
                setCursorPosition({ line, column });
                break;
            }
            currentLine += lineLength;
        }
        return (
            <div className="line-word-cursor-info">
                <p>Posición del cursor: Línea {cursorPosition.line}, Columna {cursorPosition.column}</p>
            </div>
        );
    };

    /**
     ### Manejar sugerencias

     Esta función carga las sugerencias desde el server para luego ser mostradas cunado se neseciten.
     */
    const handleSuggestions = async (inputText) => {
        const trimmedInput = inputText.trim();

        if (!trimmedInput) {
            setSuggestions([]);
            return;
        }

        const result = await keywords();
        const lastWord = trimmedInput.split(/\s+/).pop().toLowerCase();

        const suggestionsList = result.data.filter(word =>
            word.toLowerCase().startsWith(lastWord)
        );

        setSuggestions(suggestionsList);
    };
    /**
     ### Manejar el click en las sugerencias

     Esta función permite clickear la sugerencia y esta se añadira al codiigo en pantalla.
     */
    const handleSuggestionClick = (suggestion) => {
        const currentContent = code;
        const updatedContent = currentContent ? currentContent + suggestion : suggestion;
        onCodeChange(updatedContent);
        setSuggestions([]);
    };
    /**
     ### Guardar Script

     Esta función guarda el código actual bajo el nombre especificado y muestra un mensaje en la barra de estado.
     */
    const handleSaveScript = async () => {
        !id ? setStatusBarMessage("Error: ingrese un nombre para el script.") : (async () => {
            const result = await saveScript(id, code);
            setFileName(id + ".txt");
            setStatusBarMessage(result.message);
        })();
    };

    /**
     ### Recuperar Script

     Esta función recupera un script por su nombre y actualiza el código del editor.
     También notifica al componente principal (`App`) de los cambios.
     */

    const handleRetrieveScript = async () => {
        !id ? setStatusBarMessage("Error: ingrese un nombre de script para recuperar.") : await (async () => {
            const result = await retrieveScript(id);
            result.success && onCodeChange(result.code);
            setFileName(id + ".txt");
            setStatusBarMessage(result.message);
        })();
    };

    // Función para manejar el desplazamiento del textarea y sincronizar con los números de línea
    const handleScroll = () => {
        const textarea = textareaRef.current; // Obtiene la referencia al textarea
        const lineNumbers = lineNumbersRef.current; // Obtiene la referencia a los números de línea
        lineNumbers.scrollTop = textarea.scrollTop; // Sincroniza el desplazamiento vertical de los números de línea con el textarea
    };

// Función para obtener los números de línea basados en el código
    const getLineNumbers = () => {
        return code.split('\n').map((_, index) => (
            <div key={index + 1} className="line-number">{index + 1}</div> // Crea elementos para cada número de línea
        ));
    };

// Efecto que se ejecuta al cargar o cambiar el código
    useEffect(() => {
        const textarea = textareaRef.current; // Obtiene la referencia al textarea
        const lineNumbers = lineNumbersRef.current; // Obtiene la referencia a los números de línea

        // Función para actualizar la altura de los números de línea según la altura del textarea
        const updateLineNumbersHeight = () => {
            const textareaComputedStyle = getComputedStyle(textarea);
            lineNumbers.style.height = textareaComputedStyle.height; // Actualiza la altura de los números de línea
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
    }, [code]); // El efecto se ejecuta cada vez que el código cambia



    return (
        <div className="EA">
            <div>
                <input
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value);
                        idchange(e.target.value)
                    }}
                    placeholder="Nombre del script"
                />
                <button onClick={handleSaveScript}><i className="fa fa-save"></i></button>
                <button onClick={handleRetrieveScript}><i className="fa fa-folder-open"></i></button>
            </div>
            <input className="fieldName"
                   value={fileName}
                   placeholder=""
                   readOnly
            />
            <div className="editor-container">
                <div ref={lineNumbersRef} className="line-numbers">
                    {getLineNumbers()}
                </div>
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => {
                        onCodeChange(e.target.value);
                        handleSuggestions(e.target.value);
                    }}
                    onScroll={handleScroll}
                    onMouseMove={handleCursorPosition}
                    rows="10"
                    cols="50"
                ></textarea>
            </div>

            <div className="suggestions-container">
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>
            <LineWordCursorInfo code={code} />
        </div>
    );
};

export default Editor;
