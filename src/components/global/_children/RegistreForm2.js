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

const RegistreForm2 = ({setForm}) => {
  const onPressNext = () => {
    setForm(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelTitle}>Selecciona tu género</Text>
      <View>
        <TouchableHighlight style={styles.btnNext} onPress={onPressNext}>
          <View>
            <Text style={styles.labelNext}>Siguiente</Text>
            <Image
              source={require('../../../resources/images/arrowRightLine.png')}
              style={styles.righLine}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.breadcums}>
          <Image source={require('../../../resources/images/Breadcums2.png')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 17,
  },
  labelTitle: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 0.0015,
    color: '#003031',
    marginBottom: 32,
  },
  inputTextBox: {
    height: 56,
    borderColor: '#A1AAB2',
    borderRadius: 3.5,
    paddingLeft: 15,
    borderWidth: 1,
    marginBottom: 30,
  },
  btnNext: {
    backgroundColor: '#132A3E',
    height: 42,
    borderRadius: 25,
    marginTop: 198,
    marginBottom: 24,
  },
  labelNext: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  righLine: {
    position: 'absolute',
    top: 10,
    left: 310,
  },
  breadcums: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default RegistreForm2;
