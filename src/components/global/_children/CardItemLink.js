import React from 'react';
import {StyleSheet, Text, Pressable, Image, View} from 'react-native';

const CardItemLink = props => {
  const {
    title = 'Segundo episodio de podcast "Refugio en pauta"...',
    date = 'DD/MM/AAAA',
  } = props || {};
  return (
    <View style={styles.container}>
      <Image
        style={styles.containeImage}
        source={require('../../../resources/images/pictureExample.png')}
      />
      <View style={styles.containeImageText}>
        <Text style={styles.titleSection}>{title}</Text>
        <View style={styles.containerDate}>
          <Image source={require('../../../resources/images/calendar.png')} />
          <Text style={styles.titleDate}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containeImage: {
    marginVertical: 12,
    marginHorizontal: 12,
    width: 148,
    height: 100,
  },
  containerDate: {
    flexDirection: 'row',
  },
  containeImageText: {
    width: 250,
    height: 100,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  titleSection: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontWeight: 'bold',
    color: '#007681',
    marginRight: 48,
  },
  titleDate: {
    paddingStart: 9,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.0025,
    fontWeight: 'normal',
    color: '#A1AAB2',
    paddingTop: 2,
  },
});

export default CardItemLink;
