import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Profile = props => {
  const {navigation} = props;
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressLogOff = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <View style={styles.containerHeader}>
        <View style={styles.containerForm}>
          <TouchableOpacity onPress={onPressBack} style={styles.logo}>
            <Image source={require('../../resources/images/left.png')} />
          </TouchableOpacity>
          <Text style={styles.labelTitleHeader}>Perfil</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.containerBody}>
          <Text style={styles.labelTitle}>Correo electrónico</Text>
          <Text style={styles.labelSubTitle}>email@email.com</Text>
        </View>
        <View style={styles.containerBody}>
          <View style={styles.containerBody2}>
            <Text style={styles.labelTitle}>Fecha de nacimiento</Text>
            <Image source={require('../../resources/images/singleLine.png')} />
          </View>
          <Text style={styles.labelSubTitle}>0000/00/00</Text>
        </View>
        <View style={styles.containerBody}>
          <View style={styles.containerBody2}>
            <Text style={styles.labelTitle}>Género</Text>
            <Image source={require('../../resources/images/singleLine.png')} />
          </View>
          <Text style={styles.labelSubTitle}>Gender</Text>
        </View>
        <View style={styles.containerBody}>
          <View style={styles.containerBody2}>
            <Text style={styles.labelTitle}>Contraseña</Text>
            <Image source={require('../../resources/images/singleLine.png')} />
          </View>
          <Text style={styles.labelSubTitle}>****************</Text>
        </View>
        <View style={styles.containerBodyLogOff}>
          <TouchableOpacity onPress={onPressLogOff}>
            <Text style={styles.labelTitleLogOff}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginRight: 15,
    marginLeft: 17,
  },
  containerBody: {
    marginBottom: 20,
  },
  containerBody2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBodyLogOff: {
    marginTop: 20,
    marginLeft: 10,
  },
  containerHeader: {
    height: 56,
    alignItems: 'center',
    backgroundColor: '#00AAAD',
    justifyContent: 'center',
  },
  containerForm: {
    flexDirection: 'row',
  },
  labelTitleHeader: {
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  labelTitle: {
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: '#003031',
  },
  labelSubTitle: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: '#A1AAB2',
  },
  labelTitleLogOff: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    letterSpacing: 0.00125,
    color: '#00AAAD',
  },
  logo: {
    position: 'absolute',
    right: 185,
  },
});

export default Profile;
