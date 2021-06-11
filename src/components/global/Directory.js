import React from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import Header from "./_children/Header";
import { ItemDirectory } from "./_children/Card";

const Directory = (props) => {
  const data = [
    { name: "Antioquia", id: 0 },
    { name: "Arauca", id: 1 },
    { name: "Atlántico", id: 2 },
    { name: "Bogota D.C", id: 3 },
    { name: "Bolívar", id: 4 },
    { name: "Boyacá", id: 5 },
    { name: "Caldas", id: 6 },
    { name: "Caquetá", id: 7 },
    { name: "Casanare", id: 8 },
    { name: "Cauca", id: 9 },
    { name: "Cesar", id: 10 },
    { name: "Chocó", id: 11 },
    { name: "Córdoba", id: 12 },
    { name: "Cundinamarca", id: 13 },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Lineas telefónicas" />
      </View>
      <View style={[styles.box, styles.box2]}>
        <View style={styles.container}>
          <View style={styles.containerSearch}>
            <TextInput
              style={styles.inputTextBox}
              placeholder="Buscar departamento"
            />
          </View>
          <FlatList
            data={data}
            renderItem={(item) => (
              <ItemDirectory {...props} title={item.item.name} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1,
  },
  //content
  box2: {
    flex: 10,
  },
  container: {
    marginRight: 15,
    marginLeft: 16,
  },
  card: {
    justifyContent: "center",
    height: 56,
    backgroundColor: "#007681",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 24,
  },
  containerSearch: {
    marginTop: 21,
  },
  inputTextBox: {
    height: 46,
    borderColor: "#E7EAEC",
    backgroundColor: "#E7EAEC",
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 25,
    paddingLeft: 15,
  },
});

export default Directory;
