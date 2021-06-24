import React, { useReducer } from "react";
import { LOG_IN, LOG_IN_ERROR, SIGN_UP } from "../../types";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import { firebase } from "../../config/firebase";

const AuthState = (props) => {
  const initialState = {
    auth: null,
    user: null,
    message: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signIn = async (data) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        dispatch({
          type: LOG_IN,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOG_IN_ERROR,
          payload: error,
        });
      });
  };

  const signUp = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        dispatch({
          type: SIGN_UP,
          payload: response,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        user: state.user,
        message: state.message,
        registre: state.registre,
        signIn,
        signUp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
