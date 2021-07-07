import React, { useReducer } from "react";
import {
  LOG_IN,
  LOG_IN_ERROR,
  SIGN_UP,
  SIGN_UP_ERROR,
  SIGN_OUT,
  SIGN_OUT_ERROR,
  UPDATED_USER,
  UPDATED_USER_INPUT_CHANGE,
} from "../../types";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
/**
 * Maneja las operacion de signIn, signOut, signUp, registro y consulta de usuarios contra firebase authentication y firebase real-time
 */
const AuthState = (props) => {
  const initialState = {
    auth: null,
    user: null,
    message: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  /**
   * metodo que hace la autenticacion contra firebase
   * @param {Object} data datos del login de usuario
   * @param {String} data.email - email del usuario
   * @param {String} data.password - password del usuario
   * @return {Promise} devuelve una promesa al terminar la operacion, se utiliza para controlar un llamado sincrono
   */
  const signIn = async (data) => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          var user = { ...data, uid: response.user.uid };
          analytics().logEvent("signIn", { email: data.email, result: "true" });
          dispatch({
            type: LOG_IN,
            payload: user,
          });
          resolve(response.user.uid);
        })
        .catch((error) => {
          analytics().logEvent("signIn", {
            email: data.email,
            result: "false",
          });
          dispatch({
            type: LOG_IN_ERROR,
            payload: error,
          });
          resolve(false);
        });
    });
  };
  /**
   * metodo que hace el registro contra firebase
   * @param {Object} data datos del login de usuario
   * @param {String} data.email - email del usuario
   * @param {String} data.password - password del usuario
   * @return {Promise} devuelve una promesa al terminar la operacion, se utiliza para controlar un llamado sincrono
   */
  const signUp = (data) => {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          var user = { ...data, uid: response.user.uid };
          dispatch({
            type: SIGN_UP,
            payload: { response, user },
          });
          resolve(user);
        })
        .catch((error) => {
          dispatch({
            type: SIGN_UP_ERROR,
            payload: error,
          });
          resolve(null);
        });
    });
  };
  /**
   * metodo que actualiza la informacion del usuario contra la base de datos realtime.firebase
   * @param {Object} data datos del usuario
   * @param {String} data.email - email del usuario
   * @param {String} data.birdDate - fecha de nacimiento del usuario
   * @param {String} data.gender - genero del usuario
   * @param {String} data.oldMen - si es un menor indica si esta acompañado por un adulto
   */
  const updateUser = (data) => {
    database()
      .ref("/users/" + data.uid)
      .update({
        email: data.email,
        birdDate: data.birdDate,
        gender: data.gender,
        oldMen: data.oldMen,
      })
      .then(() => {
        dispatch({
          type: UPDATED_USER,
          payload: data,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  /**
   * metodo que actualiza un campo del usuario
   * @param {String} field - identificador del campo
   * @param {String} value - valor del campo
   */
  const updateUserInputChange = ({ field, value }) => {
    dispatch({
      type: UPDATED_USER_INPUT_CHANGE, 
      payload: { field, value } 
    });
  }
  /**
   * metodo que consulta la informacion del usuario contra la base de datos realtime.firebase
   * @param {String} uid - identificador unico del usuario
   */
  const getUser = (uid) => {
    database()
      .ref("/users/" + uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren())
        console.log('snapshot',snapshot.val())
          dispatch({
            type: UPDATED_USER,
            payload: snapshot.val(),
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  /**
   * metodo que hace signOut contra firebase
   */
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        dispatch({
          type: SIGN_OUT,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_OUT_ERROR,
          payload: error,
        });
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
        signOut,
        updateUser,
        getUser,
        updateUserInputChange,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
