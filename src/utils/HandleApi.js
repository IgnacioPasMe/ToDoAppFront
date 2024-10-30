import axios from 'axios'; //// Importa axios para las peticiones HTTP.

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Define la URL base.

const api = axios.create({ // Crea una instancia de axios configurada.
    baseURL: baseUrl, // Establece la URL base.
    headers: { // Define headers por defecto.
        'Content-Type': 'application/json' // Tipo de contenido JSON.
    }
});

export const getAllToDo = async (setToDo) => { // Función para obtener todas las tareas.
    try { // Inicia bloque para manejar errores.
        const { data } = await api.get("/api/todos"); // Hace la petición GET.
        setToDo(data); // Actualiza el estado con las tareas recibidas.
    } catch (error) { // Captura errores.
        console.error("Error al obtener las tareas:", error.message); //Registra el error.
    }
};

export const addToDo = async (text, date, setText, setDate, setToDo) => { //Función para añadir nueva tarea.
    try { //Inicia bloque para manejar errores.
        if (!text.trim()) { //Verifica si el texto está vacío.
            throw new Error("El texto de la tarea no puede estar vacío"); //Lanza error si no hay texto.
        }
        
        await api.post("/api/save", { text, date }); //Envía petición POST al servidor.
        setText(""); //Limpia el campo de texto.
        setDate(""); //Limpia el campo de fecha.
        await getAllToDo(setToDo); //Actualiza la lista de tareas.
    } catch (error) { //Captura errores
        console.error("Error al añadir la tarea:", error.message); //Registra el error.
    }
};

export const updateToDo = async (toDoId, text, date, setToDo, setText, setDate, setIsUpdating) => { //Función para actualizar tarea.
    try { //Inicia bloque para manejar errores.
        if (!text.trim()) {  //Verifica si el texto está vacío.
            throw new Error("El texto de la tarea no puede estar vacío"); //Lanza error si no hay texto.
        }
        
        await api.post("/api/update", { _id: toDoId, text, date }); //Envía petición POST al servidor con: ID de la tarea a actualizar, Nuevo texto, Nueva fecha.
        setText(""); //Limpia el campo de texto.
        setDate(""); //Limpia el campo de fecha.
        setIsUpdating(false); //Desactiva el modo de actualización.
        await getAllToDo(setToDo); //Actualiza la lista de tareas.
    } catch (error) { //Captura errores.
        console.error("Error al actualizar la tarea:", error.message); //Registra el error.
    }
};

export const deleteToDo = async (_id, setToDo) => { //Función para eliminar tarea
    try { //Inicia bloque para manejar errores.
        await api.post("/api/delete", { _id }); //Envía petición POST al servidor.
        await getAllToDo(setToDo); //Actualiza la lista de tareas.
    } catch (error) {  //Captura errores.
        console.error("Error al eliminar la tarea:", error.message); //Registra el error.
    }
};
