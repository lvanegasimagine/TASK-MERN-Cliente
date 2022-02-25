import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const Login = (props) => {

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta} = alertaContext;
  
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion} = authContext;

  useEffect(() => {
    if(autenticado){
      props.history.push('/proyectos')
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history])
  

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
      e.preventDefault();

      if(email.trim() === '' || password.trim() === ''){
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        return;
      }

      iniciarSesion({email, password})
  }
  
  return (
    <div className="form-usuario">
    {
      alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>: null
    }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
        <form action="" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primario btn-block">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">Nueva Cuenta</Link>
      </div>
    </div>
  );
};

export default Login;
