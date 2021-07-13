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
import { Snackbar } from "react-native-paper";
import { validateEmail } from "../../../utilities/helpers";
import Styles from "./styles";

const LoginForm = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => setVisible(false);
  const {
    auth,
    message,
    signIn,
    isSignIn,
    getUser,
    user: userData,
  } = useContext(AuthContext);

  const onPressRegistre = () => {
    props.navigation.navigate("Registre");
  };

  useEffect(() => {
    isSignIn().then((uid) => {
      if (uid) {
        getUser(uid);
      }
    });
    if (auth) {
      props.navigation.navigate("Home");
    }
  }, [auth]);

  console.log("user", userData);
  console.log("message", message);

  const { email, password } = user;

  const onPressLogin = () => {
    var ok = true;
    if (!validateEmail(email)) {
      setErrorEmail("Correo electrónico invalido");
      ok = false;
    }
    if (password === "") {
      setErrorPassword("Contraseña invalida");
      ok = false;
    }

    if (ok) {
      signIn(user).then((uid) => {
        if (uid) {
          getUser(uid);
        }
      });
      if (message !== null) {
        setVisible(true);
      }
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.labelInicio}>Inicia sesión</Text>
      <View style={Styles.containerForm}>
        <TextInput
          style={
            errorEmail !== "" ? Styles.inputTextBoxError : Styles.inputTextBox
          }
          placeholder="Correo electrónico"
          onChangeText={(e) => {
            setUser({ ...user, email: e });
            setErrorEmail("");
            setErrorPassword("");
          }}
        />
        {errorEmail !== "" && (
          <Text style={Styles.labelError}>{errorEmail}</Text>
        )}
        <TextInput
          style={
            errorPassword !== ""
              ? Styles.inputTextBoxError
              : Styles.inputTextBox
          }
          secureTextEntry={true}
          placeholder="Contraseña"
          onChangeText={(e) => {
            setUser({ ...user, password: e });
            setErrorPassword("");
          }}
        />
        {errorPassword !== "" && (
          <Text style={Styles.labelError}>{errorPassword}</Text>
        )}
        <Text style={Styles.labelForgetPassword}>¿Olvidaste tu contraseña</Text>
        <TouchableHighlight style={Styles.btnIniciar} onPress={onPressLogin}>
          <Text style={Styles.labelLogin}>Iniciar sesión</Text>
        </TouchableHighlight>
        <View style={Styles.noCuenta}>
          <Text style={Styles.labelAccount}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={onPressRegistre}>
            <Text style={Styles.labelRegistrate}>Regístrate</Text>
          </TouchableOpacity>
        </View>
        {/*<View>
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
        </View>*/}
        <View style={Styles.s}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
            action={{
              label: "X",
              onPress: () => {
                // Do something
              },
            }}
          >
            No existe usuario con estas credenciales
          </Snackbar>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
