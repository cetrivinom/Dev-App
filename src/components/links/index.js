import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../global/_children/Header";
import { ItemLink } from "../global/_children/Card";
import FilterLink from "./_children/FilterLink";

const Links = (props) => {
  const [showFilterOption, setShowFilterOption] = useState(false);

  const onPressClose = () => {
    setShowFilterOption((prev) => !prev);
  };
  const data = [
    {
      Titulo: "Enlace de interés 4",
      Resumen: 'Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper',
      Contenido:
        "Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper. Aenean mauris dolor, rhoncus eu tempor vel, commodo at metus. Ut aliquam gravida elit, iaculis pulvinar tortor viverra sed. Nam dictum pharetra rutrum. Aliquam egestas enim tortor, eget porttitor dui bibendum vitae. Nulla fringilla, augue ut sodales semper, tortor mauris maximus mauris, ac malesuada turpis augue sit amet tellus. Donec vel nisi maximus, hendrerit felis fringilla, pellentesque massa. Donec rhoncus, massa at convallis finibus, dolor massa dictum magna, a convallis lorem elit sed risus. Aenean vitae leo rutrum, egestas diam in, condimentum ipsum. Duis commodo diam mollis semper finibus. Nulla id pharetra augue. Nullam libero massa, varius eu blandit quis, fermentum sed augue. Morbi hendrerit rhoncus ligula nec consectetur. Etiam mattis tempor purus, ac fermentum mi. Ut et lacus elementum, lacinia leo in, pharetra tellus. Duis viverra erat et felis dignissim, in porta erat mattis. In mi diam, accumsan et dui a, ullamcorper pulvinar mi. Sed iaculis magna magna. Ut a lobortis orci. Praesent pulvinar, neque at lacinia auctor, odio diam rhoncus arcu, a rutrum nibh nulla in est. Suspendisse interdum imperdiet diam, vitae mattis purus ornare in. Duis ac leo scelerisque, dictum quam eu, scelerisque magna. Proin ut turpis semper lorem molestie eleifend. Aenean ultricies vitae est a consectetur. Aliquam erat volutpat. Ut dictum viverra diam, quis tempus lorem molestie id. Vestibulum ullamcorper ex est, in porttitor sem mollis eget. Cras justo neque, faucibus sed venenatis non, auctor in nulla.",
      Imagen:
        "/sites/default/files/contenidos-interes/imagen-moviles/enlace4.jpg",
      Fecha: "21-JUN-2021",
    },
    {
      Titulo: "Enlace de interés 3",
      Resumen: 'Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper',
      Contenido:
        "Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper. Aenean mauris dolor, rhoncus eu tempor vel, commodo at metus. Ut aliquam gravida elit, iaculis pulvinar tortor viverra sed. Nam dictum pharetra rutrum. Aliquam egestas enim tortor, eget porttitor dui bibendum vitae. Nulla fringilla, augue ut sodales semper, tortor mauris maximus mauris, ac malesuada turpis augue sit amet tellus. Donec vel nisi maximus, hendrerit felis fringilla, pellentesque massa. Donec rhoncus, massa at convallis finibus, dolor massa dictum magna, a convallis lorem elit sed risus. Aenean vitae leo rutrum, egestas diam in, condimentum ipsum. Duis commodo diam mollis semper finibus. Nulla id pharetra augue. Nullam libero massa, varius eu blandit quis, fermentum sed augue. Morbi hendrerit rhoncus ligula nec consectetur. Etiam mattis tempor purus, ac fermentum mi. Ut et lacus elementum, lacinia leo in, pharetra tellus. Duis viverra erat et felis dignissim, in porta erat mattis. In mi diam, accumsan et dui a, ullamcorper pulvinar mi. Sed iaculis magna magna. Ut a lobortis orci. Praesent pulvinar, neque at lacinia auctor, odio diam rhoncus arcu, a rutrum nibh nulla in est. Suspendisse interdum imperdiet diam, vitae mattis purus ornare in. Duis ac leo scelerisque, dictum quam eu, scelerisque magna. Proin ut turpis semper lorem molestie eleifend. Aenean ultricies vitae est a consectetur. Aliquam erat volutpat. Ut dictum viverra diam, quis tempus lorem molestie id. Vestibulum ullamcorper ex est, in porttitor sem mollis eget. Cras justo neque, faucibus sed venenatis non, auctor in nulla.",
      Imagen:
        "/sites/default/files/contenidos-interes/imagen-moviles/enlace3.jpg",
      Fecha: "21-JUN-2021",
    },
    {
      Titulo: "Enlace de interés 2",
      Resumen: 'Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper',
      Contenido:
        "Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper. Aenean mauris dolor, rhoncus eu tempor vel, commodo at metus. Ut aliquam gravida elit, iaculis pulvinar tortor viverra sed. Nam dictum pharetra rutrum. Aliquam egestas enim tortor, eget porttitor dui bibendum vitae. Nulla fringilla, augue ut sodales semper, tortor mauris maximus mauris, ac malesuada turpis augue sit amet tellus. Donec vel nisi maximus, hendrerit felis fringilla, pellentesque massa. Donec rhoncus, massa at convallis finibus, dolor massa dictum magna, a convallis lorem elit sed risus. Aenean vitae leo rutrum, egestas diam in, condimentum ipsum. Duis commodo diam mollis semper finibus. Nulla id pharetra augue. Nullam libero massa, varius eu blandit quis, fermentum sed augue. Morbi hendrerit rhoncus ligula nec consectetur. Etiam mattis tempor purus, ac fermentum mi. Ut et lacus elementum, lacinia leo in, pharetra tellus. Duis viverra erat et felis dignissim, in porta erat mattis. In mi diam, accumsan et dui a, ullamcorper pulvinar mi. Sed iaculis magna magna. Ut a lobortis orci. Praesent pulvinar, neque at lacinia auctor, odio diam rhoncus arcu, a rutrum nibh nulla in est. Suspendisse interdum imperdiet diam, vitae mattis purus ornare in. Duis ac leo scelerisque, dictum quam eu, scelerisque magna. Proin ut turpis semper lorem molestie eleifend. Aenean ultricies vitae est a consectetur. Aliquam erat volutpat. Ut dictum viverra diam, quis tempus lorem molestie id. Vestibulum ullamcorper ex est, in porttitor sem mollis eget. Cras justo neque, faucibus sed venenatis non, auctor in nulla.",
      Imagen:
        "/sites/default/files/contenidos-interes/imagen-moviles/enlace2.jpg",
      Fecha: "21-JUN-2021",
    },
    {
      Titulo: "Enlace de interés 1",
      Resumen: 'Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper',
      Contenido:
        "Proin vulputate pharetra justo, nec venenatis eros commodo vitae. Sed semper nunc vitae ante dignissim ullamcorper. Aenean mauris dolor, rhoncus eu tempor vel, commodo at metus. Ut aliquam gravida elit, iaculis pulvinar tortor viverra sed. Nam dictum pharetra rutrum. Aliquam egestas enim tortor, eget porttitor dui bibendum vitae. Nulla fringilla, augue ut sodales semper, tortor mauris maximus mauris, ac malesuada turpis augue sit amet tellus. Donec vel nisi maximus, hendrerit felis fringilla, pellentesque massa. Donec rhoncus, massa at convallis finibus, dolor massa dictum magna, a convallis lorem elit sed risus. Aenean vitae leo rutrum, egestas diam in, condimentum ipsum. Duis commodo diam mollis semper finibus. Nulla id pharetra augue. Nullam libero massa, varius eu blandit quis, fermentum sed augue. Morbi hendrerit rhoncus ligula nec consectetur. Etiam mattis tempor purus, ac fermentum mi. Ut et lacus elementum, lacinia leo in, pharetra tellus. Duis viverra erat et felis dignissim, in porta erat mattis. In mi diam, accumsan et dui a, ullamcorper pulvinar mi. Sed iaculis magna magna. Ut a lobortis orci. Praesent pulvinar, neque at lacinia auctor, odio diam rhoncus arcu, a rutrum nibh nulla in est. Suspendisse interdum imperdiet diam, vitae mattis purus ornare in. Duis ac leo scelerisque, dictum quam eu, scelerisque magna. Proin ut turpis semper lorem molestie eleifend. Aenean ultricies vitae est a consectetur. Aliquam erat volutpat. Ut dictum viverra diam, quis tempus lorem molestie id. Vestibulum ullamcorper ex est, in porttitor sem mollis eget. Cras justo neque, faucibus sed venenatis non, auctor in nulla.",
      Imagen:
        "/sites/default/files/contenidos-interes/imagen-moviles/enlace1_0.jpg",
      Fecha: "21-JUN-2021",
    },
    {
      Titulo: "58694a0f-3da1-471f-bd96-145571e29d724",
      Resumen: 'Tercer episodio de podcast "Refugio en pauta"...',
      Contenido:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin nulla nec rhoncus blandit. Nunc fringilla scelerisque consequat.",
      Imagen:
        "/sites/default/files/contenidos-interes/imagen-moviles/enlace1_0.jpg",
      Fecha: "30-JUN-2021",
    },
    {
      Titulo: "538694a0f-3da1-471f-bd96-145571e29d724",
      Resumen: 'Tercer episodio de podcast "Refugio en pauta"...',
      Contenido:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin nulla nec rhoncus blandit. Nunc fringilla scelerisque consequat.",
      Imagen:
        "/sites/default/files/contenidos-interes/imagen-moviles/enlace1_0.jpg",
      Fecha: "30-JUN-2021",
    },
    {
      Titulo: "548694a0f-3da1-471f-bd96-145571e29d724",
      Resumen: 'Tercer episodio de podcast "Refugio en pauta"...',
      Contenido:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin nulla nec rhoncus blandit. Nunc fringilla scelerisque consequat.",
      Imagen:
        "/sites/default/files/contenidos-interes/imagen-moviles/enlace1_0.jpg",
      Fecha: "30-JUN-2021",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Enlaces de interés" />
        <FilterLink setShowFilterOption={setShowFilterOption} />
      </View>
      <View style={[styles.box, styles.box2]}>
        <FlatList
          data={data}
          renderItem={(item) => (
            <ItemLink
              {...props}
              title={item.item.Resumen}
              date={item.item.Fecha}
            />
          )}
          keyExtractor={(item) => item.Titulo}
        />
      </View>
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
