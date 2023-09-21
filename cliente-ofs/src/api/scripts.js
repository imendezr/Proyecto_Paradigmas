import axios from 'axios';

export const saveScript = async (scriptName, code) => {
    try {
        const response = await axios.post('http://localhost:3001/api/save', {
            scriptName: scriptName,
            code: code
        });

        if (response.data.success) {
            return { success: true, message: "Script guardado con éxito." };
        } else {
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Error al guardar el script:", error);
        return { success: false, message: "Error al guardar el script." };
    }
};

export const retrieveScript = async (scriptName) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/retrieve/${scriptName}`);

        if (response.data.success) {
            return { success: true, code: response.data.code, message: "Script recuperado con éxito." };
        } else {
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Error al recuperar el script:", error);
        return { success: false, message: "Error al recuperar el script." };
    }
};

export const sendCodeToServer = async (codeToSend) => {
    try {
        const response = await axios.post('http://localhost:3001/compile', {
            code: codeToSend
        });

        if (response.data.success) {
            return { success: true, transpiledCode: response.data.output };
        } else {
            return { success: false, message: response.data.message || "Error al procesar el código." };
        }
    } catch (error) {
        console.error("Error al enviar el código al servidor:", error);
        return { success: false, message: "Error al comunicarse con el servidor." };
    }
};
