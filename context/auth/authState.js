import React, { useReducer } from "react";
import { LOG_IN, LOG_IN_ERROR, SIGN_UP } from "../../types";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import analytics from '@react-native-firebase/analytics'
//import { firebase } from "../../config/firebase";

const AuthState = (props) => {
  const initialState = {
    auth: null,
    user: null,
    message: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signIn = async (data) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        analytics().logEvent('signIn',{email:data.email,result:'true'});
        dispatch({
          type: LOG_IN,
          payload: response,
        });
      })
      .catch((error) => {
        analytics().logEvent('signIn',{email:data.email,result:'false'});
        dispatch({
          type: LOG_IN_ERROR,
          payload: error,
        });
      });
  };

  const signUp = (data) => {
    console.log('signUp.1',data)
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        console.log('signUp.2',response)
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
