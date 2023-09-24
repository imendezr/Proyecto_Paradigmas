/**
 # Componente ConsoleArea

 Este componente representa la consola donde se muestran los mensajes y se ofrece un botón para compilar el código.

 ## Propiedades

 - `message`: Mensaje a mostrar en la consola.
 - `onCompile`: Función que se llama cuando se presiona el botón "Compilar".

 ## Vista

 Un botón para compilar el código y un área de texto para mostrar los mensajes de la consola.
 */

function ConsoleArea({ message, onCompile }) {
    return (
        <div className="Console">
            <div className="RA">
                <button onClick={onCompile}>Compilar</button>
                <textarea readOnly value={message} rows="3"></textarea>
            </div>
        </div>
    );
}

export default ConsoleArea;
