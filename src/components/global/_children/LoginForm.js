import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

const LoginForm = props => {
  const onPressRegistre = () => {
    props.navigation.navigate('Registre');
  };

  const onPressLogin = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelInicio}>Inicia sesión</Text>
      <View style={styles.containerForm}>
        <TextInput
          style={styles.inputTextBox}
          placeholder="Correo electrónico"
        />
        <TextInput style={styles.inputTextBox} placeholder="Contraseña" />
        <Text style={styles.labelForgetPassword}>
          ¿Olvidaste tu contraseña?
        </Text>
        <View>
          <TouchableHighlight style={styles.btnIniciar} onPress={onPressLogin}>
            <Text style={styles.labelLogin}>Iniciar sesión</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.noCuenta}>
          <Text style={styles.labelAccount}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={onPressRegistre}>
            <Text style={styles.labelRegistrate}>Regístrate</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.labelIngresa}>O ingresa con:</Text>
          <View style={styles.containerSocial}>
            <View>
              <TouchableOpacity style={styles.btnSocialAccountGoogle}>
                <Image
                  source={require('../../../resources/images/GoogleIcon.png')}
                />
                <Text style={styles.labelSocial}>Google</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.btnSocialAccountFacebook}>
                <Image
                  source={require('../../../resources/images/FacebookIcon.png')}
                />
                <Text style={styles.labelSocial}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  labelInicio: {
    fontSize: 22,
    fontFamily: 'Dosis',
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: 'center',
    color: '#003031',
    marginTop: 24,
    marginBottom: 32,
  },
  labelAccount: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: 'center',
    color: '#003031',
  },
  labelForgetPassword: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.005,
    textDecorationLine: 'underline',
    marginBottom: 32,
  },
  labelIngresa: {
    textAlign: 'center',
    color: '#003031',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 19,
    letterSpacing: 0.005,
    marginLeft: 8,
    marginBottom: 16,
  },
  labelLogin: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: 'center',
    paddingVertical: 12,
  },
  labelSocial: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: 'center',
    paddingVertical: 12,
    paddingLeft: 5,
  },
  containerForm: {
    marginRight: 15,
    marginLeft: 17,
  },
  inputTextBox: {
    height: 56,
    borderColor: '#A1AAB2',
    fontFamily: 'Roboto',
    borderRadius: 3.5,
    paddingLeft: 15,
    borderWidth: 1,
    marginBottom: 29,
  },
  btnIniciar: {
    backgroundColor: '#132A3E',
    height: 42,
    borderRadius: 25,
    marginBottom: 24,
  },
  btnSocialAccountGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#A1AAB2',
    paddingHorizontal: 50,
    borderWidth: 1,
    height: 42,
    width: 170,
    borderRadius: 25,
  },
  btnSocialAccountFacebook: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#A1AAB2',
    paddingHorizontal: 45,
    borderWidth: 1,
    height: 42,
    width: 170,
    borderRadius: 25,
    marginLeft: 16,
  },
  noCuenta: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  containerSocial: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  labelRegistrate: {
    color: '#FEC800',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 19,
    letterSpacing: 0.005,
    marginLeft: 8,
  },
});

export default LoginForm;
