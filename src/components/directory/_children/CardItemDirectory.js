/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

const CardItemDirectory = (props) => {
  const { title = "" } = props || {};
  const onPressOpen = () => {
    props.navigation.navigate("DirectoryItem", {
      itemId: 86,
      otherParam: title,
    });
  };

  return (
    <TouchableHighlight onPress={onPressOpen} style={styles.card}>
      <Text style={styles.cardTitle}>{title.toUpperCase()}</Text>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    height: 56,
    backgroundColor: "#007681",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 28,
    color: "#FFFFFF",
    letterSpacing: 0.0015,
  },
});

export default CardItemDirectory;
