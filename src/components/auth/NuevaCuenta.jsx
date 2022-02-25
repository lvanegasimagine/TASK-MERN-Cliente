import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const NuevaCuenta = (props) => {

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta} = alertaContext;
  
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario} = authContext;

  // usuario registrado, autenticado o error
  useEffect(() => {
    if(autenticado){
      props.history.push('/proyectos');
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history])
  

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmar.trim() === ""){
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return ;
    }
    
    // Password Minimo 6 Caracteres

    if(password.length < 6 ){
      mostrarAlerta("El password debe tener al menos 6 caracteres", "alerta-error");
      return ;
    }
    
    // Confirmar el password
    if(password !== confirmar ){
      mostrarAlerta("Los password no coinciden", "alerta-error");
      return ;
    }

    console.log(nombre, email, password);
    registrarUsuario({
      nombre, email, password
    })
  };

  return (
    <div className="form-usuario">
    {
      alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> )
      : null
    }
      <div className="contenedor-form sombra-dark">
        <h1>Obtener Una Cuenta</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Tu Nombre"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Tu Email"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              placeholder="Tu Password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              value={confirmar}
              name="confirmar"
              placeholder="Repite Tu Password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Registrarme
            </button>
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
