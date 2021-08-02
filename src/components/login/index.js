import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Image } from "react-native";
import LoginForm from "./_children/LoginForm";
import AuthContext from "../../../context/auth/authContext";
import IOMContext from "../../../context/iomData/iomContext";
import Styles from "./styles";

const Login = (props) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const { auth, signInAnonymously, isSignIn, getUser, getConfig } = useContext(AuthContext);
  const { getUserComments} = useContext(IOMContext);

  useEffect(() => {
    getConfig().then((config) => {
      if (config.anonymousAuth) {
        signInAnonymously().then((uid) => {
          if (uid) {
            getUser(uid);
            getUserComments(uid);
          }
        });
      } else {
        isSignIn().then((uid) => {
          if (uid) {
            getUser(uid);
            getUserComments(uid);
          }
          else setVisibleLogin(true);
        });
      }
    });

    if (auth) {
      props.navigation.navigate("Home");
    }
  }, [auth]);

  return (
    <ImageBackground
      source={require("../../resources/images/backgroundLogIn.png")}
      style={Styles.image}
    >
      <Image
        source={require("../../resources/images/Logo.png")}
        style={Styles.logo}
      />
      {visibleLogin && <LoginForm {...props} />}
    </ImageBackground>
  );
};

export default Login;
