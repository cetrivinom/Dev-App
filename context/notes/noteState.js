import React, { useReducer } from "react";
import { ADD_NOTE, DELETE_NOTE } from "../../types";
import NoteReducer from "./noteReducer";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // Crear state inicial
  const initialState = {
    note: [],
  };

  // useReducer con dispatch  para ejecutar las funciones
  const [state, dispatch] = useReducer(NoteReducer, initialState);

  // Selecciona el Producto que el usuario desea ordenar
  const addnote = (note) => {
    dispatch({
      type: ADD_NOTE,
      payload: note,
    });
  };

  // Cuando el usuario confirma un platillo
  const deletenote = (id) => {
    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
  };

  return (
    <NoteContext.Provider
      value={{
        note: state.note,
        addnote,
        deletenote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
