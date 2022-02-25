import { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from "../../context/tareas/tareaContext";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTarea = () => {

  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;
  const tareasContext = useContext(tareaContext);
  const {tareasproyecto} = tareasContext

  // Si no hay proyecto seleccionado

  if(!proyecto){
    return <h2>Selecciona un proyecto</h2>
  }

  // Array destructuring para extraer el proyecto actual

  const [proyectoActual] = proyecto;

  

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id)
  }
  return (
    <Fragment>
      <h2 className="mr-3">Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">No hay Tareas</li>
        ) 
        : <TransitionGroup>
        {(
          tareasproyecto.map((tarea) => (
            <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
              <Tarea  tarea={tarea} />
            </CSSTransition>
          ))
        )}
        </TransitionGroup>
        
        }
      </ul>
      <button type="button" className="btn btn-eliminar" onClick={onClickEliminar}>
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTarea;
