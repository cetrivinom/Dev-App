import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import Header from "../global/_children/Header";
import CardItemDirectory from "./_children/CardItemDirectory";
import IOMContext from "../../../context/iomData/iomContext";
/**
 * Componente que construye el Directorio, hace el llamado al action que devuelve la informacion del API
 * @param {Object} this.props - objeto de propiedades heredados de la clase padre.
 * @return {Object} <View /> Directorio de lineas telefonicas
 */
const Directory = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dataDirectory, getDataDirectory } = useContext(IOMContext);

  useEffect(() => {
    getDataDirectory();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Lineas telefónicas" />
      </View>
      <View style={[styles.box, styles.box2]}>
        <View style={styles.containerSearch}>
          <TextInput
            style={styles.inputTextBox}
            onChangeText={(e) => setSearchTerm(e)}
            placeholder="Buscar departamento"
          />
        </View>
        {dataDirectory != null && (
          <FlatList
            data={dataDirectory}
            renderItem={(item) => (
              <CardItemDirectory {...props} title={item.item.departamento} />
            )}
            keyExtractor={(item) => item.departamento_id}
          />
        )}
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
    marginHorizontal: 15,
  },
  containerSearch: {
    marginVertical: 20,
  },
  inputTextBox: {
    height: 46,
    borderColor: "#E7EAEC",
    backgroundColor: "#E7EAEC",
    borderRadius: 25,
    borderWidth: 1,
    paddingLeft: 15,
  },
});

export default Directory;
