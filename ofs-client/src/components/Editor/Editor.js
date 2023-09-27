/**
 # Componente Editor

 El componente Editor permite a los usuarios escribir, guardar y recuperar scripts. Los scripts se guardan bajo un nombre
 especificado, y se pueden recuperar posteriormente a través de ese mismo nombre.

 ## Importaciones

 Utilizamos funciones auxiliares de la API para guardar y recuperar scripts.
 */


import {compileCodeOnServer, keywords, retrieveScript, saveScript} from '../../api/scripts';
import React, {useEffect, useState, useRef} from 'react';

/**
 ## Definición del Componente

 El editor recibe dos funciones del componente principal (`App`):
 - `setStatusBarMessage`: Actualizar mensajes en la barra de estado.
 - `onCodeChange`: Notificar cambios en el código.

 Dentro del componente, gestionamos dos estados principales:
 - `code`: El código actual que el usuario ha escrito o recuperado.
 - `id`: El nombre bajo el cual se guardará o se ha guardado un script.
 */

const Editor = ({code, setStatusBarMessage, onCodeChange}) => {
    const [id, setId] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);
    /**
     ### Guardar Script

     Esta función guarda el código actual bajo el nombre especificado y muestra un mensaje en la barra de estado.
     */

    const handleSuggestions  = async (inputText) => {
        if (inputText.trim() === '') {
            setSuggestions([]);
            return;
        }
        const result =  await keywords();
        setSuggestions(result.data);
        const words = inputText.split(/\s+/);
        const lastWord = words[words.length - 1];
        const suggestionsList = result.data.filter((word) => {
            return word.toLowerCase().startsWith(lastWord.toLowerCase());
        });

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
            setStatusBarMessage(result.message);
        })();
    };

    /**
     ### Recuperar Script

     Esta función recupera un script por su nombre y actualiza el código del editor.
     También notifica al componente principal (`App`) de los cambios.
     */

    const handleRetrieveScript = async () => {
        !id ? setStatusBarMessage("Error: ingrese un nombre de script para recuperar.") : (async () => {
            const result = await retrieveScript(id);
            result.success && onCodeChange(result.code);
            setStatusBarMessage(result.message);
        })();
    };

    const handleScroll = () => {
        const textarea = textareaRef.current;
        const lineNumbers = lineNumbersRef.current;
        lineNumbers.scrollTop = textarea.scrollTop;
    };

    const getLineNumbers = () => {
        const lines = code.split('\n');
        const totalLines = lines.length;
        const lineNumbers = [];
        for (let i = 1; i <= totalLines; i++) {
            lineNumbers.push(<div key={i} className="line-number">{i}</div>);
        }
        return lineNumbers;
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
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Nombre del script"
                />
                <button onClick={handleSaveScript}><i className="fa fa-save"></i></button>
                <button onClick={handleRetrieveScript}><i className="fa fa-folder-open"></i></button>
            </div>
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
