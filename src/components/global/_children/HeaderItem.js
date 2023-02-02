import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import IOMContext from "../../../../context/iomData/iomContext";


const HeaderItem = (props) => {
  const { title = "", id = "", showSaveOpt = true, navigation } = props || {};
  const { createFavorite, dataFavorite } = useContext(IOMContext);
  const [ isFavorite, setIsFavorite] = useState(false);

  const onPressClose = () => {
    navigation.goBack();
  };
  const onPressSave = () => {
    createFavorite({id});
    setIsFavorite(true);
  };

  useEffect(() => {
    let index = dataFavorite.findIndex(favorite => favorite.id == id);
    if (index >= 0)
    setIsFavorite(true);
  });
  
  return (
    <View style={[styles.box, styles.box1]}> 
      <View style={styles.statusBarBackground}>
      </View>
      <View style={styles.boxImage}>
        <Image source={require("../../../resources/images/linkIcon.png")} />
      </View>
      <View style={styles.box4}>
        <TouchableOpacity onPress={onPressClose}>
          <Image
            source={require("../../../resources/images/riCloseLine.png")}
          />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{title}</Text>
          <TouchableOpacity onPress={onPressSave}>
            {showSaveOpt && (
              <Image
                source={isFavorite?require("../../../resources/images/riBookmarkLine2.png"):require("../../../resources/images/riBookmarkLine.png")}
              />
            )}
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1,
  },
  boxImage: {
    marginTop: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#003031",
    alignItems: 'center',
    //lineHeight: 28,
    letterSpacing: 0.0015,
  },
  box4: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginBottom: 30,
  },  
  statusBarBackground:{
    height: (Platform.OS === 'ios') ? metrics.WIDTH * 0.06 : 0,
    //backgroundColor: "#00AAAD",
  },
});

export default HeaderItem;
