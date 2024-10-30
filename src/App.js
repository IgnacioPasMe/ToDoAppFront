import { useEffect, useState } from "react"; //Importa hooks de React. useState se utiliza para manejar el estado en componentes funcionales, mientras que useEffect permite realizar efectos secundarios, como cargar datos al montar el componente.
import ToDo from "./components/ToDo"; //Importa componente toDo.
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi"; //Se importan las funciones de API.

function App() {
  const [toDo, setToDo] = useState([]); //Estado para la lista de tareas.
  const [text, setText] = useState(""); // Estado para el texto de la tarea.
  const [isUpdating, setIsUpdating] = useState(false); //Estado para modo de actualización.
  const [toDoId, setToDoId] = useState("");  //Estado para ID de tarea en edición.
  const [date, setDate] = useState(""); //Estado para fecha de la tarea.
  const [error, setError] = useState(""); //Estado para mensajes de error.

  useEffect(() => { //Efecto que se ejecuta al montar el componente.
      getAllToDo(setToDo); //Carga inicial de tareas.
  }, []);

  
  const updateMode = (_id, text, date) => { //Función para activar modo de actualización.
      setIsUpdating(true); //Activa el modo de actualización.
      setText(text); //Establece el texto actual.
      setDate(date); //Establece la fecha actual.
      setToDoId(_id); //Guarda el ID de la tarea.
  };

  const handleSubmit = async (e) => { //Manejador del envío del formulario.
      e.preventDefault(); //Previene el comportamiento por defecto.
      setError(""); //Limpia mensajes de error previos.

      if (!text.trim()) { //Verifica si el texto está vacío.
          setError("El texto de la tarea no puede estar vacío"); //Establece mensaje de error.
          return; //Termina la ejecución.
      }

      if (isUpdating) { //Verifica si está en modo actualización.
          await updateToDo(toDoId, text, date, setToDo, setText, setDate, setIsUpdating); //Actualiza la tarea existente.
      } else { //Si no está en modo actualización.
          await addToDo(text, date, setText, setDate, setToDo);  //Crea nueva tarea.
      }
  };

  return (
      <div className="App">
          <div className="container">
              <h1>App Recordatorios</h1>
              
              <form onSubmit={handleSubmit} className="top">
                  <input
                      type="text"
                      placeholder="Añade una nueva tarea.."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                  />
                  
                  <input
                      className="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                  />
                  
                  <button type="submit" className="add">
                      {isUpdating ? "Actualizar" : "Añadir"}
                  </button>
              </form>
              
              {error && <div className="error">{error}</div>}
              
              <div className="list">
                  {toDo.map((item) => (
                      <ToDo
                          key={item._id}
                          text={item.text}
                          date={item.date}
                          updateMode={() => updateMode(item._id, item.text, item.date)}
                          deleteToDo={() => deleteToDo(item._id, setToDo)}
                      />
                  ))}
              </div>
          </div>
      </div>
  );
}
export default App; //se exporta el componente App.
