import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../resources/images/Logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00AAAD',
  },
  logo: {
    top: 163,
    width: 379,
    height: 201.53,
    resizeMode: 'contain',
  },
});

export default Splash;
