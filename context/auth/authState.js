import React, { useReducer } from "react";
import { LOG_IN, LOG_IN_ERROR, SIGN_UP,SIGN_UP_ERROR,SIGN_OUT,SIGN_OUT_ERROR,UPDATED_USER } from "../../types";
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
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          var user = {...data,uid:response.user.uid}
          analytics().logEvent('signIn',{email:data.email,result:'true'});
          dispatch({
            type: LOG_IN,
            payload: user,
          });
          resolve(response.user.uid)
        })
        .catch((error) => {
          analytics().logEvent('signIn',{email:data.email,result:'false'});
          dispatch({
            type: LOG_IN_ERROR,
            payload: error,
          });
          resolve(false);
        });
    });
  };

  const signUp = (data) => {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          var user = {...data,uid:response.user.uid}
          dispatch({
            type: SIGN_UP,
            payload: {response,user},
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

  const updateUser = (data) => {
    database()
      .ref('/users/' + data.uid)
      .update({email:data.email,birdDate:data.birdDate,gender:data.gender,oldMen:data.oldMen})
      .then(()=> {        
        dispatch({
          type: UPDATED_USER,
          payload: data,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };


  const getUser = (uid) => {
    database()
      .ref('/users/' + uid)
      .once('value',snapshot => {
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

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('Signed Out');         
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
}

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
