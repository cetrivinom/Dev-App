import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Header from "../global/_children/Header";
import { ItemFavorite } from "../global/_children/Card";

const Favorites = (props) => {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Puesto de Atención al Migrante (PAM)...",
      title2: "Activo con modalidad presencial",
      title3: "8:00am - 5:00pm",
      date: "01-JUN-2021",
      point: 2,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Super CADE Social",
      title2: "Activo con modalidad presencial",
      title3: "8:00am - 3:00pm",
      point: 4,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Punto de Atención y Orientación (PAO)...",
      title2: "Restringido con modalidad remota",
      date: "30-JUN-2021",
      title3: "8:00am - 12:00pm",
      point: 5,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos favoritos" />
      </View>
      <View style={[styles.box, styles.box2]}>   
        <FlatList
          data={data}
          renderItem={(item) => (
            <ItemFavorite
              title={item.item.title}
              title2={item.item.title2}
              title3={item.item.title3}
              point={item.item.point}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
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
    flex: 1,
  },
  //content
  box2: {
    flex: 10,
  },
});

export default Favorites;
