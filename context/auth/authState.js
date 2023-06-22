import React, { useReducer } from "react";
import {
  LOG_IN,
  LOG_IN_ERROR,
  SIGN_UP,
  SIGN_UP_ERROR,
  SIGN_OUT,
  SIGN_OUT_ERROR,
  UPDATED_USER,
  UPDATED_PASS,
  USER_PASSWORD_RECOVERY,
  UPDATED_USER_INPUT_CHANGE,
  UPDATED_PASS_INPUT_CHANGE,
  GET_CONFIG, DEFAULT_CONFIG,
  NEW_FAVORITE,
  GET_DATA_FAVORITES,
  GET_DATA_ERROR
} from "../../types";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";

import moment from 'moment-timezone';
/**
 * Maneja las operacion de signIn, signOut, signUp, registro y consulta de usuarios contra firebase authentication y firebase real-time
 */
const AuthState = (props) => {
  const initialState = {
    auth: null,
    user: null,
    message: null,
    pass: null,
    config: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  /**
   * metodo que hace la autenticacion mediante email contra firebase
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
   * metodo que hace la autenticacion anonima contra firebase
   * @param {Object} data datos del login de usuario
   * @param {String} data.email - email del usuario
   * @param {String} data.password - password del usuario
   * @return {Promise} devuelve una promesa al terminar la operacion, se utiliza para controlar un llamado sincrono
   */
  const signInAnonymously = async () => {
    return new Promise((resolve, reject) => {
      auth()
        .signInAnonymously()
        .then((response) => {
          var user = { email: "", uid: response.user.uid };
          analytics().logEvent("signInAnonymously", { result: "true" });
          dispatch({
            type: LOG_IN,
            payload: user,
          });
          resolve(response.user.uid);
        })
        .catch((error) => {
          analytics().logEvent("signInAnonymously", {
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
   * metodo que valida si el usuario tiene una sesion activa y no le pide loggin
   * @return {Promise} devuelve una promesa al terminar la operacion, se utiliza para controlar un llamado sincrono
   */
  const isSignIn = async () => {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged((response) => {
        if (response) {
          var user = { email: response.email, uid: response.uid };
          analytics().logEvent("isSignIn", {
            email: response.email,
            result: "true",
          });
          dispatch({
            type: LOG_IN,
            payload: user,
          });
          resolve(response.uid);
        } else resolve(false);
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
          var message;
          switch (error.code) {
            case 'auth/weak-password':
              message = 'Password invalido';
              break;
            case 'auth/email-already-in-use':
              message = 'El email ya se encuentrá registrado';
              break;
            default:
              message = '' + error;
              break;
          }
          dispatch({
            type: SIGN_UP_ERROR,
            payload: message,
          });
          resolve(null);
        });
    });
  };
  /**
   * metodo que actualiza el password en firebase
   * @param {String} currentPass - password anterior
   * @param {String} newPass - nuevo password
   */
  const updatePassword = async (pass) => {
    return new Promise((resolve, reject) => {
      const emailCred = auth.EmailAuthProvider.credential(
        auth().currentUser.email, pass.currentPass);
      auth().currentUser.reauthenticateWithCredential(emailCred)
        .then(() => {
          auth().currentUser.updatePassword(pass.newPass).then((response) => {
            analytics().logEvent("updatePassword", {
              user: auth().currentUser.email,
              result: "true"
            });
            resolve({ value: true });
          })
            .catch((error) => {
              resolve({ value: false, message: 'la nueva contraseña no es valida' });
            });
        })
        .catch((error) => {
          analytics().logEvent("updatePassword", {
            user: auth().currentUser.email,
            result: "false"
          });
          resolve({ value: false, message: 'la contraseña actual no es valida' });
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
        aceptaTyC: true,
        timestamp: moment().format('DD/MM/YY, HH:mm:ss')
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
      payload: { field, value },
    });
  };
  /**
   * metodo que actualiza el password cuando el usuario quiere cambiarlo
   * @param {String} field - identificador del campo
   * @param {String} value - valor del campo
   */
  const updatePassInputChange = ({ field, value }) => {
    dispatch({
      type: UPDATED_PASS_INPUT_CHANGE,
      payload: { field, value },
    });
  };
  /**
   * metodo que consulta la informacion del usuario contra la base de datos realtime.firebase
   * @param {String} uid - identificador unico del usuario
   */
  const getUser = (uid) => {
    database()
      .ref("/users/" + uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren())
          dispatch({
            type: UPDATED_USER,
            payload: snapshot.val(),
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getDataFavorite = async (uid) => {



    await database()
      .ref("/favorites/" + uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          dispatch({
            type: GET_DATA_FAVORITES,
            payload: snapshot.val(),
          });

        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteFavoriteF = (user, id) => {

    database()
      .ref("/favorites/" + user.uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          let dataF = snapshot;
          let array = [];

          dataF && dataF.forEach((child) => {
            let data = {};
            data.id = child.val().id;
            data.k = child.key;
            array.push(data)
          });



          let aa = array.find(item => item.id === id);


          if (aa !== undefined && aa.length !== 0) {

            database()
              .ref("/favorites/" + user.uid + "/" + aa.k)
              .remove()
              .then(() => {
                console.log("Eliminado")
              })
              .catch((error) => {
                console.log(error)
              });

          }

        }
      })




  }

  const createFavoriteF = (user, favoriteId) => {

    let data = {
      id: favoriteId
    }

    database()
      .ref("favorites/" + user.uid)
      .push(data)
      .then((value) => {
        dispatch({
          type: NEW_FAVORITE,
          payload: value,
        });
      })
      .catch((error) => {
        console.error(error);
      });


  }

  const createFavoriteArray = (user, favoriteId) => {


    let data = {
      id: favoriteId
    }

    database()
      .ref("/favorites/" + user.uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          let dataF = snapshot;
          let array = [];

          dataF && dataF.forEach((child) => {
            let data = {};
            data.id = child.val().id;
            data.k = child.key;
            array.push(data)
          });


          let aa = array.find(item => item.id === favoriteId);


          if (aa === undefined) {

            database()
              .ref("favorites/" + user.uid)
              .push(data)
              .then((value) => {
                dispatch({
                  type: NEW_FAVORITE,
                  payload: value,
                });
              })
              .catch((error) => {
                console.error(error);
              });

          }

        } else {
          database()
            .ref("favorites/" + user.uid)
            .push(data)
            .then((value) => {
              dispatch({
                type: NEW_FAVORITE,
                payload: value,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })




  }


  const createCoordenadas = (user, coordenadas) => {

    console.log(user)
    console.log(coordenadas)

    let fecha = coordenadas.fecha;
    let fecha1 = fecha.split(',');
    let fechaDia = fecha1[0];
    let horaFinal = fecha1[1].split(':')[0].trim();


    database()
      .ref("/coordenadas/" + user.uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          let dataF = snapshot;
          let array = [];

          dataF && dataF.forEach((child) => {
            let data = {};
            let fecha = child.val().fecha;
            let fecha1 = fecha.split(',');
            let fechaDia = fecha1[0];
            let horaFinal = fecha1[1].split(':')[0].trim();
            data.fecha = fechaDia;
            if (Number(horaFinal) + 1 === 25) {
              horaFinal = 0;
            }
            if (Number(horaFinal) - 1 === -1) {
              horaFinal = 24;
            }
            data.horaMax = Number(horaFinal) + 1
            array.push(data)
          });

          console.log("array",array);


          let aa = array.find(item => item.fecha === fechaDia && horaFinal <= item.horaMax);
          if (aa === undefined) {

            database()
              .ref("coordenadas/" + user.uid)
              .push(coordenadas)
              .then((value) => {
                console.log("creado");
              })
              .catch((error) => {
                console.error(error);
              });


          }

          

        }else{
          database()
              .ref("coordenadas/" + user.uid)
              .push(coordenadas)
              .then((value) => {
                console.log("creado");
              })
              .catch((error) => {
                console.error(error);
              });
        }
      })





  }


  /**
   * metodo que consulta los parametros de configuracion contra la base de datos realtime.firebase
   */
  const getConfig = () => {
    return new Promise((resolve, reject) => {
      database()
        .ref("/configApp/")
        .once("value", (snapshot) => {
          if (snapshot.hasChildren())
            dispatch({
              type: GET_CONFIG,
              payload: snapshot.val(),
            });
          resolve(snapshot.val());
        })
        .catch((error) => {
          alert(error);
          resolve(false);
        });
    });
  };
  /**
   * metodo que consulta los parametros de configuracion contra la base de datos por default
   */
  const getDefaultConfig = () => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: GET_CONFIG,
        payload: DEFAULT_CONFIG,
      });
      resolve(DEFAULT_CONFIG);
    });
  };
  /**
   * metodo que hace signOut contra firebase
   */
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
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
  /**
   * metodo que restablece el password de una cuenta
   * @param {String} email - email del usuario
   */
  const passwordEmailRecovery = (email) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({
          type: USER_PASSWORD_RECOVERY
        });
        alert('Se envio un correo a ' + email + ' para reestablecer la contraseña');
      }).catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('La cuenta ' + email + ' no se encuentra registrada');
            break;
        }
      });
  }

  const updateUserDate = (data) => {


    database()
      .ref("/users/" + data.uid)
      .update({
        lastdate: moment().format('DD/MM/YY, HH:mm:ss')
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

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        user: state.user,
        message: state.message,
        registre: state.registre,
        config: state.config,
        pass: state.pass,
        signIn,
        signInAnonymously,
        isSignIn,
        signUp,
        signOut,
        updateUser,
        getUser,
        updateUserInputChange,
        updatePassInputChange,
        passwordEmailRecovery,
        updatePassword,
        getConfig,
        getDefaultConfig,
        deleteFavoriteF,
        createFavoriteF,
        createFavoriteArray,
        createCoordenadas,
        getDataFavorite,
        updateUserDate
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
