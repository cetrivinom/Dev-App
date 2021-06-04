import React from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../resources/images/backgroundEllipse.png')}
        style={styles.image}>
        <Image
          source={require('../../../resources/images/Logo.png')}
          style={styles.logo2}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 186,
  },
  logo: {
    top: 25,
    width: 263,
    height: 140,
    resizeMode: 'contain',
  },
  logo2: {
    width: 255,
    height: 136,
    position: 'absolute',
    left: 78,
    top: 34,
  },
});

export default HeaderHome;
