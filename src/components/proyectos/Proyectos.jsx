import { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/AuthContext";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import FormTarea from "../tareas/FormTarea";
import ListadoTarea from "../tareas/ListadoTareas";

const Proyectos = () => {
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    useEffect(() => {
      usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return ( <div className="contenedor-app">
        <Sidebar/>
        <div className="seccion-principal">
            <Navbar/>
            <main>
            <FormTarea/>
                <div className="contenedor-tarea">
                    <ListadoTarea/>
                </div>
            </main>
        </div>
    </div> );
}

export default Proyectos;