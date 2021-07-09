import React, { useEffect, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Header from "../global/_children/Header";
import CardtemFavorite from "./_children/CardtemFavorite";
import IOMContext from "../../../context/iomData/iomContext";

const Favorites = (props) => {
  const { dataFavorite, getDataFavorite } = useContext(IOMContext);

  useEffect(() => {
    getDataFavorite();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos favoritos" />
      </View>
      {dataFavorite !== null && (
        <View style={[styles.box, styles.box2]}>
          <FlatList
            data={dataFavorite}
            renderItem={(item) => <CardtemFavorite id={item.item.id} />}
            keyExtractor={(item) => item.id}
          />
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
    flex: 1,
  },
  //content
  box2: {
    flex: 10,
  },
});

export default Favorites;
