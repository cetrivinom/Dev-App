/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";
import { metrics } from "../../../utilities/Metrics";

const CardItemDirectoryDetail = (props) => {
  const { dataItemService, getDataDirectoryItemService } = useContext(IOMContext);
  const {
    title = "",
    subTitle = "",
    subTitle1 = "Humanity & Inclusion",
    subTitle2 = "3004255896 - 3148866747",
    subTitle3 = "Lunes - Viernes: 8:30 a.m. a 4:30 p.m.",
  } = props || {};
  const [open, setOpen] = useState(false);

  const onPressOpen = () => {
    setOpen((prev) => !prev);
    getDataDirectoryItemService(subTitle);
  };

  const { descripcion = "" } = dataItemService || {};

  return (
    <>
      <TouchableOpacity onPress={onPressOpen}>
        <View style={styles.containerItem}>
          <View style={styles.form}>
            <View style={styles.form2}>
              <View>
                <Text style={styles.textDetail}>{title}</Text>
                <Image
                  source={
                    !open
                      ? require("../../../resources/images/riArrowDownsLine.png")
                      : require("../../../resources/images/riArrowOpenLine.png")
                  }
                  style={styles.image}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {open && (
        <View style={styles.form3}>
          <Text style={styles.textTitle3}>{descripcion}</Text>
          <View style={styles.form4}>
            <Text style={styles.textDetail4}>{subTitle1}</Text>
            <View style={styles.form5}>
              <Image
                source={require("../../../resources/images/phone.png")}
                style={styles.image2}
              />
              <Text style={styles.textDetail5}>{subTitle2}</Text>
            </View>
            <View style={styles.form5}>
              <Image
                source={require("../../../resources/images/riTimeFill.png")}
                style={styles.image2}
              />
              <Text style={styles.textDetail5}>{subTitle3}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textTitle3: {
    fontSize: 13,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    textAlign: "justify",
  },
  containerItem: {
    borderWidth: 0.54,
    borderColor: "#A1AAB2",
  },
  form: {
    height: 78,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  textDetail: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#003031",
  },
  form2: {
    width: 330,
  },
  image: {
    position: "absolute",
    top: 4,
    right: -25,
  },
  form3: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  form4: {
    marginTop: 24,
  },
  textDetail4: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: "#007681",
  },
  textDetail5: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    marginStart: 28,
  },
  form5: {
    marginTop: 10,
    flexDirection: "row",
  },
  image2: {
    position: "absolute",
    top: -3,
  },
});

export default CardItemDirectoryDetail;
