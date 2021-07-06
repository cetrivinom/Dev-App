import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import Header from "../global/_children/Header";
import { ItemDirectory } from "../global/_children/Card";
import DirectoryContext from "../../../context/directory/directoryContext";
/**
 * Componente que construye el Directorio, hace el llamado al action que devuelve la informacion del API
 * @param {Object} this.props - objeto de propiedades heredados de la clase padre.
 * @return {Object} <View /> Directorio de lineas telefonicas
 */
const Directory = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, dataFilter, getDataDirectory } = useContext(DirectoryContext);

  useEffect(() => {
    getDataDirectory();
  }, []);

  console.log("data", data);

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
              onChangeText={(e) => setSearchTerm(e)}
              placeholder="Buscar departamento"
            />
          </View>
          <FlatList
            data={data}
            renderItem={(item) => (
              <ItemDirectory {...props} title={item.item.departamento} />
            )}
            keyExtractor={(item) => item.departamento_id}
          />
        </View>
      </View>
    </View>
  );
};
/**
 * Hoja de estilos aplicadas a Directory
 */
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
