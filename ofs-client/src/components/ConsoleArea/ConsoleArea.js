/**
 # Componente ConsoleArea

 Este componente representa la consola donde se muestran los mensajes y se ofrece un botón para compilar el código.

 ## Propiedades

 - `message`: Mensaje a mostrar en la consola.
 - `onCompile`: Función que se llama cuando se presiona el botón "Compilar".

 ## Vista

 Un botón para compilar el código y un área de texto para mostrar los mensajes de la consola.
 */

function ConsoleArea({message, onCompile, onEvaluate}) {
    return (
        <div className="RA">
            <div>
                <button onClick={onCompile}>Compilar</button>
                <button onClick={onEvaluate}>Evaluar</button>
            </div>
            <textarea readOnly value={message} rows="3"></textarea>
        </div>
    );
}

export default ConsoleArea;
