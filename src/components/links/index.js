import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../global/_children/Header";
import CardItemLink from "./_children/CardItemLink";
import HeaderFilterLink from "./_children/HeaderFilterLink";
import IOMContext from "../../../context/iomData/iomContext";

const Links = (props) => {
  const [showFilterOption, setShowFilterOption] = useState(false);
  const { dataLink, getDataLink } = useContext(IOMContext);

  console.log("dataLink", dataLink);

  const onPressClose = () => {
    setShowFilterOption((prev) => !prev);
  };

  useEffect(() => {
    getDataLink();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Enlaces de interés" />
        <HeaderFilterLink setShowFilterOption={setShowFilterOption} />
      </View>
      {dataLink !== null && (
        <View style={[styles.box, styles.box2]}>
          <FlatList
            data={dataLink}
            renderItem={(item) => (
              <CardItemLink
                {...props}
                title={item.item.Titulo}
                resume={item.item.Resumen}
                content={item.item.Contenido}
                image={item.item.Imagen}
                date={item.item.Fecha}
              />
            )}
            keyExtractor={(item) => item.Titulo}
          />
        </View>
      )}
      {showFilterOption && (
        <View style={styles.box3}>
          <View style={styles.boxImage}>
            <Image source={require("../../resources/images/linkIcon.png")} />
          </View>
          <View style={styles.box4}>
            <TouchableOpacity onPress={onPressClose}>
              <Image
                source={require("../../resources/images/riCloseLine.png")}
              />
            </TouchableOpacity>

            <Text style={styles.text}>Filtrar contenido</Text>
            <Image
              source={require("../../resources/images/riBookmarkLine.png")}
            />
          </View>
          <View style={styles.box5}>
            <View style={styles.box6}>
              <Text style={styles.textBox}>Tipo de contenido</Text>
              <Image
                source={require("../../resources/images/trailingIcon.png")}
              />
            </View>
            <View style={styles.box7}>
              <View style={[styles.caja1]}>
                <Text style={styles.textBoxCaja}>Borrar</Text>
              </View>
              <View style={[styles.caja1, styles.caja2]}>
                <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
                  Filtrar
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1.5,
  },
  //content
  box2: {
    flex: 10,
  },
  box3: {
    position: "absolute",
    height: 300,
    width: "100%",
    backgroundColor: "#FFFFFF",
    bottom: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    shadowColor: "rgba(207, 207, 205, 0.45)",
  },
  boxImage: {
    marginTop: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "500",
    color: "#003031",
    lineHeight: 28,
    letterSpacing: 0.0015,
  },
  box4: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginBottom: 30,
  },
  box5: {
    marginHorizontal: 21,
  },
  box6: {
    flexDirection: "row",
    borderRadius: 3.5,
    borderColor: "#A1AAB2",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    height: 54,
    paddingHorizontal: 15,
    marginBottom: 100,
  },
  textBox: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#425565",
    lineHeight: 19,
    letterSpacing: 0.005,
  },
  box7: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caja1: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    borderWidth: 1,
    width: 175,
    borderRadius: 25,
    borderColor: "#A1AAB2",
  },
  caja2: {
    backgroundColor: "#132A3E",
    marginStart: 10,
  },
  textBoxCaja: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.0125,
  },
  textBoxCajaNegra: {
    color: "#FFFFFF",
  },
});

export default Links;
