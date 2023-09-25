/**
 # Módulo para interactuar con el servidor OFS

 Este módulo proporciona funciones para interactuar con el servidor OFS.
 */

import axios from 'axios';

const SERVER_URL = 'http://localhost:3005';

/**
 * Envía el script al servidor y devuelve la respuesta.
 */
const postToServer = (endpoint, data) => axios.post(`${SERVER_URL}${endpoint}`, data).then(response => response.data);

const saveScript = (scriptName, code) =>
    postToServer('/api/save', {scriptName, code})
        .then(response => ({
            success: response.success,
            message: response.success ? "Script guardado con éxito." : response.message
        }))
        .catch(error => {
            console.error("Error al guardar el script:", error);
            return {success: false, message: "Error al guardar el script."};
        });

const retrieveScript = scriptName =>
    axios.get(`${SERVER_URL}/script/${scriptName}`)
        .then(response => ({
            success: response.data.success,
            code: response.data.code,
            message: response.data.success ? "Script recuperado con éxito." : response.data.message
        }))
        .catch(error => {
            console.error("Error al recuperar el script:", error);
            return {success: false, message: "Error al recuperar el script."};
        });

const sendCodeToServer = codeToSend =>
    postToServer('/api/compile', {code: codeToSend})
        .then(response => ({
            success: response.success,
            output: response.success ? response.output : "Error al procesar el código.",
            message: response.message
        }))
        .catch(error => {
            console.error("Error al enviar el código al servidor:", error);
            return {success: false, message: "Error al comunicarse con el servidor."};
        });

const getAboutInfo = () =>
    axios.get(`${SERVER_URL}/about`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error al obtener información 'Acerca de':", error);
            return {success: false, message: "Error al obtener información."};
        });

export {saveScript, retrieveScript, sendCodeToServer, getAboutInfo};
