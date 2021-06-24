import React from "react";
import { ImageBackground, Image } from "react-native";
import LoginForm from "./_children/LoginForm";
import Styles from "./styles";

const Login = (props) => {
  return (
    <ImageBackground
      source={require("../../resources/images/backgroundLogIn.png")}
      style={Styles.image}
    >
      <Image
        source={require("../../resources/images/Logo.png")}
        style={Styles.logo}
      />
      <LoginForm {...props} />
    </ImageBackground>
  );
};

export default Login;
