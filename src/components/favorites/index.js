import React, { useEffect, useContext, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Header from "../global/_children/Header";
import CardtemFavorite from "./_children/CardtemFavorite";
import IOMContext from "../../../context/iomData/iomContext";
import AsyncStorage from '@react-native-community/async-storage'
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

const Favorites = (props) => {
  var {dataFavorite, getDataFavorite, deleteFavorite } = useContext(IOMContext);
  useEffect(() => {

getDataFavorite();

   

  }, []);

  
  
  const deleteItemById = id => {
    deleteFavorite(id);
    dataFavorite=(dataFavorite.filter(item => item.id !== id));
    
  }

  return (
    
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos favoritos" />
      </View>
      {dataFavorite !== null && (
        <View style={[styles.box, styles.box2]}>
          <FlatList
          style={{ height: 200 }}
            data={dataFavorite}
            renderItem={(item) => <View style={{display:'flex', flexDirection:'row',borderBottomWidth: 3,
            borderColor: "#E7EAEC"}}>
              <CardtemFavorite {...props} id={item.item.id} />
              <MenuProvider style={{position:'absolute', top:8, right:8}}>
                <Menu>
                  <MenuTrigger>
                    <Image source={require("../../resources/images/riMoreLine.png")} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => deleteItemById(item.item.id)} customStyles={{ height: 48, width: 100 }}>
                      <Text style={styles.textTitle2}>Borrar</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </MenuProvider>
            </View>}
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
