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
    alignContent: 'center',
    alignItems: 'center'
  },
  logo2: {
    width: 265,
    height: 136,
    //position: 'absolute',
    resizeMode: 'contain',
    //left: 78,
    top: 34,
  },
});

export default HeaderHome;
