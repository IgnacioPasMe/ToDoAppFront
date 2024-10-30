import React from 'react'; //Se importa la biblioteca React.

import {BiEdit} from "react-icons/bi"; //Importa icono de edición.
import {AiFillDelete} from "react-icons/ai"; //Importa icono de eliminación.

const ToDo = ({text, date, updateMode, deleteToDo}) => {  //El componente ToDo es una representación visual. Permite al usuario ver el texto de la tarea y proporciona dos acciones: editar y eliminar. Utiliza iconos para mejorar la interfaz de usuario.
    return (
        <div className="todo">
            <div className="text">{text}</div>
            <div className="todo-date">{new Date(date).toLocaleDateString()}</div>
            <div className="icons">
                <BiEdit className='icon' onClick={updateMode} />
                <AiFillDelete className='icon' onClick={deleteToDo} />
            </div>

        </div>
    )
}

export default ToDo; //Exporta el componente.