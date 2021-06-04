import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  TextInput,
} from 'react-native';
import Header from './_children/Header';

function createItemRow(msg, index) {
  return (
    <TouchableHighlight key={index} style={[styles.card]}>
      <Text style={styles.cardTitle}>{msg.toUpperCase()}</Text>
    </TouchableHighlight>
  );
}

const Directory = props => {
  const items = [
    {name: 'Antioquia', id: 0},
    {name: 'Arauca', id: 1},
    {name: 'Atlántico', id: 2},
    {name: 'Bogota D.C', id: 3},
    {name: 'Bolívar', id: 4},
    {name: 'Boyacá', id: 5},
    {name: 'Caldas', id: 6},
    {name: 'Caquetá', id: 7},
    {name: 'Casanare', id: 8},
    {name: 'Cauca', id: 9},
    {name: 'Cesar', id: 10},
    {name: 'Chocó', id: 11},
    {name: 'Córdoba', id: 12},
    {name: 'Cundinamarca', id: 13},
  ];

  return (
    <View>
      <Header {...props} showBack={false} title="Lineas telefónicas" />
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <TextInput
            style={styles.inputTextBox}
            placeholder="Buscar departamento"
          />
        </View>
        <View style={styles.scrollView}>
          <ScrollView>
            {items.map((guess, index) => createItemRow(guess.name, guess.id))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 16,
  },
  card: {
    justifyContent: 'center',
    height: 56,
    backgroundColor: '#007681',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 28,
    color: '#FFFFFF',
    letterSpacing: 0.0015,
  },
  containerSearch: {
    marginTop: 21,
  },
  scrollView: {
    maxHeight: 550,
  },
  inputTextBox: {
    height: 46,
    borderColor: '#E7EAEC',
    backgroundColor: '#E7EAEC',
    borderRadius: 25,
    paddingLeft: 15,
    borderWidth: 1,
    marginBottom: 25,
  },
});

export default Directory;
