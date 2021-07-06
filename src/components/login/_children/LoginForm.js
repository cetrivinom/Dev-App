import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../../../context/auth/authContext";
import { validateEmail } from "../../../utilities/helpers";
import Styles from "./styles";

const LoginForm = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { auth, message, signIn, user: userData } = useContext(AuthContext);

  const onPressRegistre = () => {
    props.navigation.navigate("Registre");
  };

  useEffect(() => {
    if (auth) {
      props.navigation.navigate("Home");
    }
  }, [auth]);

  console.log("user", userData);
  console.log("message", message);

  const { email, password } = user;

  const onPressLogin = () => {
    if (!validateEmail(email)) {
    } else {
      signIn(user);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.labelInicio}>Inicia sesión</Text>
      <View style={Styles.containerForm}>
        <TextInput
          style={Styles.inputTextBox}
          placeholder="Correo electrónico"
          onChangeText={(e) => setUser({ ...user, email: e })}
        />
        <TextInput
          style={Styles.inputTextBox}
          placeholder="Contraseña"
          onChangeText={(e) => setUser({ ...user, password: e })}
        />
        <Text style={Styles.labelForgetPassword}>
          ¿Olvidaste tu contraseña
        </Text>
        <View>
          <TouchableHighlight style={Styles.btnIniciar} onPress={onPressLogin}>
            <Text style={Styles.labelLogin}>Iniciar sesión</Text>
          </TouchableHighlight>
        </View>
        <View style={Styles.noCuenta}>
          <Text style={Styles.labelAccount}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={onPressRegistre}>
            <Text style={Styles.labelRegistrate}>Regístrate</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={Styles.labelIngresa}>O ingresa con:</Text>
          <View style={Styles.containerSocial}>
            <View>
              <TouchableOpacity style={Styles.btnSocialAccountGoogle}>
                <Image
                  source={require("../../../resources/images/GoogleIcon.png")}
                />
                <Text style={Styles.labelSocial}>Google</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={Styles.btnSocialAccountFacebook}>
                <Image
                  source={require("../../../resources/images/FacebookIcon.png")}
                />
                <Text style={Styles.labelSocial}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
