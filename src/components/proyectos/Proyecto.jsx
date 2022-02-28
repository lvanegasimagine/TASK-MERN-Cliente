import { useContext } from "react";
import proyectoContext from "../../context/proyectos/ProyectoContext";
import tareaContext from "../../context/tareas/tareaContext";


const Proyecto = ({proyecto}) => {
  
  const proyectosContext = useContext(proyectoContext);
  const {proyectoActual} = proyectosContext;

  // Funcion para agregar el proyecto actual

  const tareasContext = useContext(tareaContext);
  const {obtenerTareas} = tareasContext

  const seleccionarProyecto = id => {
      proyectoActual(id);
      obtenerTareas(id);
  }

  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={() => seleccionarProyecto(proyecto._id)}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
