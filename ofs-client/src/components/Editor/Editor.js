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
    /**
     ### Guardar Script

     Esta función guarda el código actual bajo el nombre especificado y muestra un mensaje en la barra de estado.
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

    const handleSuggestionClick = (suggestion) => {
        const currentContent = code;
        const updatedContent = currentContent ? currentContent + suggestion : suggestion;
        onCodeChange(updatedContent);
        setSuggestions([]);
    };
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

    const handleScroll = () => {
        const textarea = textareaRef.current;
        const lineNumbers = lineNumbersRef.current;
        lineNumbers.scrollTop = textarea.scrollTop;
    };

    const getLineNumbers = () => {
        return code.split('\n').map((_, index) => (
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
    }, [code]);

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
        </div>
    );
};

export default Editor;
