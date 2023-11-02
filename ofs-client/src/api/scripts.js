/**
 # Módulo para interactuar con el servidor OFS

 Este módulo proporciona funciones para interactuar con el servidor OFS.
 */

import axios from 'axios';

const { MAIN_SERVER_PORT } = require('../config');

const SERVER_URL = `http://localhost:${MAIN_SERVER_PORT}`;

/**
 * Envía el script al servidor y devuelve la respuesta.
 */
const postToServer = (endpoint, data) =>
    axios.post(`${SERVER_URL}${endpoint}`, data).then(response => response.data);

const saveScript = (id, code) =>
    postToServer('/script/save', {id, code})
        .then(response => ({
            success: response.success,
            message: response.success ? "Script guardado con éxito." : response.message
        }))
        .catch(error => {
            console.error("Error al guardar el script:", error);
            return {success: false, message: "Error al guardar el script."};
        });

const retrieveScript = id =>
    axios.get(`${SERVER_URL}/script/${id}`)
        .then(response => ({
            success: response.data.success,
            code: response.data.code,
            message: response.data.success ? "Script recuperado con éxito." : response.data.message
        }))
        .catch(error => {
            console.error("Error al recuperar el script:", error);
            return {success: false, message: "Error al recuperar el script."};
        });

const retrievetxt = () =>
    axios.get(`${SERVER_URL}/getTxt`)
        .then(response => ({
            success: response.data.success,
            content: response.data.content,
            message: response.data.success ? "Script recuperado con éxito." : response.data.message,
        }))
        .catch(error => {
            console.error("Error al recuperar el script:", error);
            return {success: false, message: "Error al recuperar el script."};
        });

const keywords = () =>
    axios.get(`${SERVER_URL}/keywords`)

const compileCodeOnServer = codeToSend =>
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
const transFixed = () =>
    axios.get(`${SERVER_URL}/api/fixed`)
        .then(response => ({
            success: response.data.success,
            content: response.data.content,
            message: response.data.success
        }))
        .catch(error => {
            console.error("Error al enviar el código al servidor:", error);
            return {success: false, message: "Error al comunicarse con el servidor e."};
        });

const transFixed2 = () =>
    axios.get(`${SERVER_URL}/api/fixed2`)
        .then(response => ({
            success: response.data.success,
            content: response.data.content,
            message: response.data.success
        }))
        .catch(error => {
            console.error("Error al enviar el código al servidor:", error);
            return {success: false, message: "Error al comunicarse con el servidor e."};
        });

const evaluateCodeOnServer = codeToSend =>
    postToServer('/api/eval', {code: codeToSend})
        .then(response => ({
            success: true,
            output: response.output
        }))
        .catch(error => {
            console.error("Error al evaluar el código en el servidor:", error);
            return {success: false, message: "Error al comunicarse con el servidor equis de."};
        });

const getAboutInfo = () =>
    axios.get(`${SERVER_URL}/about`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error al obtener información 'Acerca de':", error);
            return {success: false, message: "Error al obtener información."};
        });

export {
    saveScript,
    retrieveScript,
    compileCodeOnServer,
    getAboutInfo,
    evaluateCodeOnServer,
    retrievetxt,
    keywords,
    transFixed,
    transFixed2
};
