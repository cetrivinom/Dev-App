/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ItemDirectoryDetail } from "./Card";

const DirectoryItem = (props) => {
  const { otherParam = "" } = props.navigation.state.params || {};

  const onPressClose = () => {
    props.navigation.goBack();
  };

  const data = [
    {
      title: "Atención psicosocial y Reabilitación discapacitados",
      id: 0,
      items: {
        text: "Acompañamiento y asesoría psicológica de manera virtual, recibimos ydevolvemos la llamada a la persona interesada en el acompañamiento de primeros auxilios psicológicos o proceso terapéutico.",
      },
    },
    {
      title: "Atención casos de violencia sexual, VBG y trata de personas",
      id: 1,
      items: {
        text: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo",
      },
    },
    {
      title: "Atención en medicina general",
      id: 2,
      items: {
        text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
      },
    },
    {
      title: "Orientación a victimas",
      id: 3,
      items: {
        text: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
      },
    },
    {
      title: "Orientación jurídica",
      id: 4,
      items: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod ex dolor. Nullam a urna suscipit augue egestas faucibus ut eget nibh. Donec et tellus est. Pellentesque consequat pharetra libero nec pulvinar. Nullam in dui at ipsum placerat varius. In eu ligula in lacus faucibus vestibulum ut eget augue.",
      },
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={[styles.box, styles.box1]}>
        <View style={styles.boxImage}>
          <Image source={require("../../../resources/images/linkIcon.png")} />
        </View>
        <View style={styles.box4}>
          <TouchableOpacity onPress={onPressClose}>
            <Image
              source={require("../../../resources/images/riCloseLine.png")}
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{otherParam}</Text>
          <Image
            source={require("../../../resources/images/riBookmarkLine.png")}
          />
        </View>
      </View>
      <View style={[styles.box, styles.box2]}>
        <FlatList
          data={data}
          renderItem={(item) => (
            <ItemDirectoryDetail {...props} title={item.item.title} subTitle={item.item.items.text} />
          )}
          keyExtractor={(item) => item.id}
        />
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
  boxImage: {
    marginTop: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  textTitle: {
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
});

export default DirectoryItem;
