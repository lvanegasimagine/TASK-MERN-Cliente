import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProyectoState from "./context/proyectos/ProyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/AlertaState";
import AuthState from "./context/autenticacion/AuthState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";

// Pages
// import Login from "./components/auth/Login";
// import NuevaCuenta from "./components/auth/NuevaCuenta";
// import Proyectos from "./components/proyectos/Proyectos";

// Importacion lazy
const Login = lazy(() => import("./components/auth/Login"));
const NuevaCuenta = lazy(() => import("./components/auth/NuevaCuenta"));
const Proyectos = lazy(() => import("./components/proyectos/Proyectos"));
// Revisar si tenemos un token

const token = localStorage.getItem("token");

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" component={Login}></Route>
                  <Route
                    exact
                    path="/nueva-cuenta"
                    component={NuevaCuenta}
                  ></Route>
                  <RutaPrivada exact path="/proyectos" component={Proyectos} />
                </Switch>
              </Suspense>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
