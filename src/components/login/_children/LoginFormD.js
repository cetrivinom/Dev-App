import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert
} from "react-native";
import AuthContext from "../../../../context/auth/authContext";
import { Snackbar, TextInput, HelperText } from "react-native-paper";
import { validateEmail } from "../../../utilities/helpers";
import Styles from "./styles";
import { metrics } from "../../../utilities/Metrics";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import database from "@react-native-firebase/database";
const LoginFormD = (props) => {


  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  const onDismissSnackBar = () => setVisible(false);
  const {
    auth,
    message,
    config,
    signIn,
    getUser,
    getConfig,
    passwordEmailRecovery,
    user: userData,
  } = useContext(AuthContext);



  const { email, password } = user;
  const [loading, setLoading] = useState(false)

  const onPressLogin = () => {
    setLoading(true)
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
      setLoading(false)
      signIn(user).then((uid) => {
        if (uid) {
          getUser(uid);
        }else{
          Alert.alert("Error","Usuario o contraseña incorrectos");
        }
      });
      if (message !== null) {
        setVisible(true);
      }
    }
    setLoading(false)
  };

  const [passwordVisibility, setPasswordVisibility] = useState(true);



  return (
    <ImageBackground
      source={require("../../../resources/images/fondo_mapa.png")}
      style={{
        resizeMode: "cover"
      }}
      imageStyle={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
    >
      <View style={{ padding: 24, width: null, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>



        <Text style={Styles.labelWelcome}>Ingresa con los datos que registraste</Text>

        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={(e) => {
            setUser({ ...user, email: e.trim() });
            setErrorEmail("");
            setErrorPassword("");
          }}
          mode="flat"
          left={<TextInput.Icon icon="email-outline" iconColor="#A1AAB2" />}
          style={styles.input}
          theme={{ colors: { primary: '#A1AAB2',underlineColor:'transparent',}}}
          placeholderTextColor='#A1AAB2'
          
        />
        <HelperText type="error" style={Styles.labelError} visible={errorEmail !== ""}>
          {errorEmail}
        </HelperText>




        <TextInput
          secureTextEntry={passwordVisibility}
          onChangeText={(e) => {
            setUser({ ...user, password: e });
            setErrorPassword("");
          }}
          label="Contraseña"
          mode="flat"
          left={<TextInput.Icon icon="lock-outline" iconColor="#A1AAB2" />}
          style={styles.input}
          theme={{ colors: { primary: '#A1AAB2',underlineColor:'transparent',}}}
          placeholderTextColor='#A1AAB2'
          right={<TextInput.Icon
            icon={passwordVisibility ? "eye" : "eye-off"} // where <Icon /> is any component from vector-icons or anything else
            iconColor="#A1AAB2"
            onPress={() => {
              setPasswordVisibility(!passwordVisibility)
            }}
          />}
        />
        <HelperText style={Styles.labelError}
          type="error" visible={errorPassword !== ""}>
          {errorPassword}
        </HelperText>


        <TouchableOpacity
          onPress={() => {
            if (validateEmail(user.email)) {
              passwordEmailRecovery(user.email)
            } else {
              setErrorEmail("Ingrese un email valido");
            }
          }}>
          <Text style={Styles.labelForgetPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        {loading ?

          <ActivityIndicator size="large" />

          :
          <TouchableHighlight style={Styles.btnIniciar} onPress={onPressLogin} disabled={loading}>
            <Text style={Styles.labelLogin}>Iniciar sesión</Text>
          </TouchableHighlight>

        }




      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'

  },
  containerTop: {
    flex: 1,
    backgroundColor: "#00AAAD",
  },

  divider: {
    width: metrics.WIDTH * 0.5,
  },

  containerForm: {
    marginHorizontal: 16,
  },
  s: {
    marginTop: 40,
  },
  labelInicio: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#000",
    marginTop: 12,
    marginBottom: 32,
    fontFamily:'Dosis-Regular'
  },
  labelAccount: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: "center",
    color: "#003031",
    fontFamily:'Dosis-Regular'
  },
  labelForgetPassword: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.005,
    textDecorationLine: "underline",
    marginBottom: 32,
    marginTop: 30,
    fontFamily:'Dosis-Regular'
  },
  labelIngresa: {
    textAlign: "center",
    color: "#003031",
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginLeft: 8,
    marginBottom: 16,
    fontFamily:'Dosis-Regular'
  },
  labelLogin: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
    fontFamily:'Dosis-Regular'
  },
  activeTabTextColor: {
    color: '#FFFFFF'
  },
  tabTextColor: {
    color: '#A1AAB2'
  },
  input: {
    backgroundColor: "#E6F7F7",
    fontFamily:'Roboto-Regular'

  }


})

export default LoginFormD;
