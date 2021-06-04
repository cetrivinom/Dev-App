import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from './_children/Header';
import LastUpdate from './_children/LastUpdate';

const Settings = props => {
  return (
    <View>
      <Header {...props} showBack={false} title="Puntos de servicio" />
      <LastUpdate />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
