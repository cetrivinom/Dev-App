import React from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';
import { metrics } from '../../../utilities/Metrics';

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
    width:metrics.WIDTH,
    height:metrics.HEIGHT*0.30,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo2: {
    width: metrics.WIDTH * 0.64,
    height:metrics.HEIGHT*0.25,
    //position: 'absolute',
    resizeMode: 'contain',
    //left: 78,
    top: 0,
  },
});

export default HeaderHome;
