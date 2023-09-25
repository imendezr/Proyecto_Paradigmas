/**
 # Componente Menu

 El componente Menu sirve como contenedor para el botón Acerca de, un encabezado y opciones de preferencias.

 ## Propiedades

 - `preferences`: Preferencias actuales del usuario.
 - `updatePreference`: Función para actualizar las preferencias del usuario.

 ## Estados

 - `isPreferencesOpen`: Un booleano que indica si el menú desplegable de preferencias está abierto o no.

 ## Interacciones

 El menú ofrece un botón Acerca de y un botón para abrir el menú desplegable de preferencias.
 */

import React, {useState} from 'react';
import AboutButton from './AboutButton';
import PreferencesButton from './PreferencesButton';
import PreferencesDropdown from './PreferencesDropdown';
import AboutPopup from "./AboutPopup";
import {getAboutInfo} from '../../api/scripts';

function Menu({preferences, updatePreference}) {
    const [isPreferencesOpen, setPreferencesOpen] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [aboutInfo, setAboutInfo] = useState({});

    const handleAboutClick = async () => {
        const aboutData = await getAboutInfo();

        const handleSuccess = () => {
            setAboutInfo(aboutData);
            setPopupOpen(true);
        };

        const handleError = () => {
            console.error(aboutData.message);
        };

        aboutData.success === false ? handleError() : handleSuccess();
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div className="Menu">
            <AboutButton onClick={handleAboutClick}/>
            <h1>Prototipo: Entorno OneFlowStream (OFS)</h1>
            <div className="prefContainer">
                <PreferencesButton onClick={() => setPreferencesOpen(!isPreferencesOpen)}/>
                {isPreferencesOpen &&
                    <PreferencesDropdown preferences={preferences} updatePreference={updatePreference}/>}
            </div>
            <AboutPopup isPopupOpen={isPopupOpen} closePopup={closePopup} aboutInfo={aboutInfo}/>
        </div>
    );
}

export default Menu;
