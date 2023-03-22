import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import AuthContext from "../../../../context/auth/authContext";
import { Snackbar, TextInput, HelperText } from "react-native-paper";
import { validateEmail } from "../../../utilities/helpers";
import Styles from "./styles";
import { metrics } from "../../../utilities/Metrics";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StackActions, useNavigation } from "@react-navigation/native";
import database from "@react-native-firebase/database";
const LoginFormR = (props) => {

  const [usuarios, setUsuarios] = useState([]);

  const navigation = useNavigation()

  const [user, setUser] = useState({
    email: "",
  });

useEffect(() => {

    
  database().ref('/users').on('value', snapshot => {
    let res = [];
    snapshot.forEach((value) => {
      const id = value.key;
      const email = value.val().email;
      res.push({ id, email });
    });
      
    setUsuarios(res)
  });
  }, []);

  

  const [errorEmail, setErrorEmail] = useState("");
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



  const { email } = user;

  const onPressRegister = () => {
    var ok = true;
    if (!validateEmail(email)) {
      setErrorEmail("Correo electrónico invalido");
      ok = false;
    }

    let a = usuarios.find(item => item.email === email);

    if(a!==undefined){
      Alert.alert("Error","El Correo electrónico ya se encuentra registrado");
      ok = false;
    }

    if (ok) {
      navigation.navigate("Registre", { emailA: email })
    }
  };




  return (

    <ImageBackground
      source={require("../../../resources/images/fondo_mapa.png")}
      style={{
        resizeMode: "cover"
      }}
      imageStyle={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16}}
    >
    <View style={{ padding: 24, width: null, borderBottomLeftRadius:16, borderBottomRightRadius:16 }}>

      <Text style={Styles.labelWelcome}>Ingresa tu correo electrónico para registrarte</Text>

      
       <TextInput
          mode="outlined"
          label="Correo electrónico"
          value={email}
          onChangeText={(e) => {
            setUser({ ...user, email: e.trim() });
            setErrorEmail("");
          }}
          outlineColor={errorEmail!==""? "#8F3D40":"#E7EAEC"}
          activeOutlineColor={errorEmail!==""? "#8F3D40":"#E7EAEC"}
          style={styles.input}
          textColor={"#FFFFFF"}
          placeholderTextColor='#FFFFFF'
          theme={{
            colors: {
              onSurfaceVariant: 'white',
              placeholder: "#FFFFFF"
            }
          }}
          left={<TextInput.Icon icon="email-outline" iconColor="#FFFFFF" />}
        />
        <HelperText style={Styles.labelError}
           type="error" visible={errorEmail!==""}>
          {errorEmail}
        </HelperText>
      


      <TouchableHighlight style={Styles.btnIniciarR} onPress={onPressRegister}>
        <Text style={Styles.labelLogin}>Siguiente</Text>
      </TouchableHighlight>
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
    backgroundColor: "#00AAAD",
    fontFamily:'Roboto-Regular'

  }


})

export default LoginFormR;
