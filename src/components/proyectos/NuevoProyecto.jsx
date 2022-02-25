import { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/ProyectoContext";

const NuevoProyecto = () => {
  
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario , mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = e => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProyecto = e => {
    e.preventDefault();

    // validar form, agregar al state y reiniciar el form

    if(nombre === ''){
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);

    setProyecto({
      nombre: ''
  })

  };

  const onClickFormulario = () => {
      mostrarFormulario();
  }

  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario" onClick={onClickFormulario} >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form
          action=""
          className="formulario-nuevo-proyecto"
          onSubmit={onSubmitProyecto}
        >
          <input
            type="text"
            id="nombre"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre} 
            onChange={onChangeProyecto}
          />
          <button type="submit" className="btn btn-primario btn-block">
            Agregar Proyecto
          </button>
        </form>
      ) : null}
      {
        errorformulario
        ?
        <p className="mensaje error">El nombre del proyecto es Obligatorio</p>
        : null
      }
    </Fragment>
  );
};

export default NuevoProyecto;
