import { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea,limpiarTarea  } = tareasContext;

    // Detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            setTarea(tareaseleccionada)
        }else{
            setTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])
    
    const [tarea, setTarea] = useState({
        nombre: ''
    })

    const {nombre} = tarea;
    if(!proyecto){
        return null;
    }

    const [proyectoActual] = proyecto;

    //Leer los valores
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(nombre.trim()=== ''){
            validarTarea();
            return ;
        }

        // revisa si es edicion o nueva tarea
        if(tareaseleccionada === null){
            //tareanueva
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            //Actualizar tarea existente
            actualizarTarea(tarea);
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)
        //Reiniciar form
        setTarea({
            nombre: ''
        })
    }

    return ( <div className="formulario">
        <form action="" onSubmit={onSubmit}>
            <div className="contenedor-input">
                <input type="text" className="input-text" placeholder="Nombre Tarea..." name="nombre" value={nombre} onChange={handleChange} />
            </div>
            <div className="contenedor-input">
                <button type="submit" className="btn btn-primario btn-submit btn-block">{tareaseleccionada ? 'Actualizar Tarea': 'Agregar Tarea'}</button>
            </div>
        </form>
        {
            errortarea
            ? <p className='mensaje error'>El nombre de la tarea es obligatorio </p>
            
            :null
        }
    </div> );
}
 
export default FormTarea;