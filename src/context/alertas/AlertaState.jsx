import { useReducer } from "react";
import alertaReducer from "./AlertaReducer";
import alertaContext from "./AlertaContext";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types/Index";

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertaReducer, initialState);

  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });

    // Limpiar la alerta
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 2000);
  };

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
