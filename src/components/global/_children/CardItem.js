/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, Pressable, Image, View} from 'react-native';

const CardItem = props => {
  const {image, title, name} = props;
  const onPressCard = () => {
    props.navigation.navigate(name);
  };
  return (
    <Pressable onPress={onPressCard} style={styles.wraper}>
      <View style={{borderRadius: 8}}>
        <View style={styles.cardBody}>
          <View style={{flex: 1}}>
            <Image
              style={styles.imgCover}
              source={
                image === '1'
                  ? require('../../../resources/images/mapPinFill.png')
                  : image === '2'
                  ? require('../../../resources/images/phoneFill.png')
                  : image === '3'
                  ? require('../../../resources/images/frame.png')
                  : image === '4' &&
                    require('../../../resources/images/pointSave.png')
              }
            />
          </View>
          <View style={{margin: 12}}>
            <Text style={styles.titleSection} allowFontScaling={false}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  wraper: {
    width: '50%',
    padding: 12,
  },
  cardBody: {
    backgroundColor: '#132A3E',
    flexDirection: 'column',
    height: 90,
    width: 173,
    borderRadius: 8,
    shadowColor: '#030912',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 7,
  },
  imgCover: {
    marginTop: 10,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default CardItem;
