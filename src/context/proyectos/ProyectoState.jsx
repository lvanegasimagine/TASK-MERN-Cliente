import { useReducer } from "react";
import proyectoContext from "./ProyectoContext";
import proyectoReducer from "./ProyectoReducer";
import { FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from "../../types/Index";
import clienteAxios from '../../config/axios';

const ProyectoState = props => {
  
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null
  };

  //Dispatch para ejecutar las acciones

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUDl

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //   Obtener los proyectos

  const obtenerProyectos = async() => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      dispatch({
        type: OBTENER_PROYECTO,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  };

  // Nuevo Proyecto

  const agregarProyecto = async proyecto => {
    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);
      
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      })
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  // Slecciona el proyecto que el usuario eligio
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  // Eliminar el proyecto
  const eliminarProyecto = async proyectoId => {
      try {
        await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
        dispatch({
          type: ELIMINAR_PROYECTO,
          payload: proyectoId
        })
      } catch (error) {
        const alerta = {
          msg: 'Hubo un error',
          categoria: 'alerta-error'
        }
        dispatch({
          type: PROYECTO_ERROR,
          payload: alerta
        })
      }
  }
  
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
