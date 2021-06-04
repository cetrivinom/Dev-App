import React from 'react';
import {ImageBackground, Image, StyleSheet} from 'react-native';
import LoginForm from './_children/LoginForm';

const Login = props => {
  return (
    <ImageBackground
      source={require('../../resources/images/backgroundLogIn.png')}
      style={styles.image}>
      <Image
        source={require('../../resources/images/Logo.png')}
        style={styles.logo}
      />
      <LoginForm {...props} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#00AAAD',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#00AAAD',
  },
  logo: {
    width: 263,
    height: 140,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default Login;
