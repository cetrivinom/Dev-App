import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

const CardItemFavorite = props => {
  const {
    title = 'Consultorio Jurídico UDEA - ACNUR...',
    title2 = '',
    title3 = '',
    point = 1,
  } = props || {};
  var payments = [];

  for (let i = 0; i < point; i++) {
    payments.push(
      <Image key={i} source={require('../../../resources/images/hear.png')} />,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFormTitle}>
        <Text style={styles.textTitle}>{title}</Text>
        <Image source={require('../../../resources/images/riMoreLine.png')} />
      </View>
      <View style={styles.containerForm}>{payments}</View>
      <View style={styles.containerForm}>
        <Image source={require('../../../resources/images/riMapPinFill.png')} />
        <Text style={styles.textTitle2}>{title2}</Text>
      </View>
      <View style={styles.containerForm}>
        <Image source={require('../../../resources/images/riTimeFill.png')} />
        <Text style={styles.textTitle2}>{title3}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 12,
    borderBottomWidth: 3,
    borderColor: '#E7EAEC',
  },
  containerForm: {
    flexDirection: 'row',
    marginBottom: 11,
  },
  containerFormTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontWeight: 'bold',
    color: '#003031',
  },
  textTitle2: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: '#003031',
    marginTop: 2,
    marginStart: 10.5,
  },
});

export default CardItemFavorite;
