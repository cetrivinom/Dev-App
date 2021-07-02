/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { metrics } from "../../../utilities/Metrics";
import DirectoryContext from "../../../../context/directory/directoryContext";

export const ItemMain = (props) => {
  const { image, title, name } = props;
  const onPressCard = () => {
    props.navigation.navigate(name);
  };
  return (
    <Pressable onPress={onPressCard} style={styles.wraper}>
      <View style={{ borderRadius: 8 }}>
        <View style={styles.cardBody}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.imgCover}
              source={
                image === "1"
                  ? require("../../../resources/images/mapPinFill.png")
                  : image === "2"
                  ? require("../../../resources/images/phoneFill.png")
                  : image === "3"
                  ? require("../../../resources/images/frame.png")
                  : image === "4" &&
                    require("../../../resources/images/pointSave.png")
              }
            />
          </View>
          <View style={{ margin: 12 }}>
            <Text style={styles.titleSection} allowFontScaling={false}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export const ItemFavorite = (props) => {
  const {
    title = "Consultorio Jurídico UDEA - ACNUR...",
    title2 = "",
    title3 = "",
    point = 1,
  } = props || {};
  var payments = [];

  for (let i = 0; i < point; i++) {
    payments.push(
      <Image key={i} source={require("../../../resources/images/hear.png")} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFormTitle}>
        <Text style={styles.textTitle}>{title}</Text>
        <Image source={require("../../../resources/images/riMoreLine.png")} />
      </View>
      <View style={styles.containerForm}>{payments}</View>
      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/riMapPinFill.png")} />
        <Text style={styles.textTitle2}>{title2}</Text>
      </View>
      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/riTimeFill.png")} />
        <Text style={styles.textTitle2}>{title3}</Text>
      </View>
    </View>
  );
};

export const ItemLink = (props) => {
  const {
    title = "",
    resume = "",
    content = "",
    date = "DD/MM/AAAA",
    image = "",
  } = props || {};

  const onPressOpen = () => {
    props.navigation.navigate("LinkItem", { resume, date, content, image });
  };
  let _resume = resume !== "" ? resume.substring(0, 60) : "";

  return (
    <TouchableOpacity onPress={onPressOpen}>
      <View style={styles.container2}>
        <Image
          style={styles.containeImage}
          source={{
            uri: `https://dev-mapeo.us.tempcloudsite.com${image}`,
          }}
        />
        <View style={styles.containeImageText}>
          <Text style={styles.titleSection2}>{_resume}</Text>
          <View style={styles.containerDate}>
            <Image source={require("../../../resources/images/calendar.png")} />
            <Text style={styles.titleDate}>{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ItemDirectory = (props) => {
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

export const ItemProfile = (props) => {
  const { title = "", subTitle = "", showImge = false } = props || {};
  return (
    <View style={styles.containerBody}>
      <View style={styles.containerBody2}>
        <Text style={styles.labelTitle}>{title}</Text>
        {showImge && (
          <Image source={require("../../../resources/images/singleLine.png")} />
        )}
      </View>
      <Text style={styles.labelSubTitle}>{subTitle}</Text>
    </View>
  );
};

export const ItemDirectoryDetail = (props) => {
  const { dataItemService, getDataDirectoryItemService } = useContext(DirectoryContext);
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

  console.log("dataItemService", dataItemService);

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
  titleSection: {
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  wraper: {
    width: "50%",
    padding: 11,
  },
  cardBody: {
    backgroundColor: "#132A3E",
    flexDirection: "column",
    height: 90,
    width: metrics.WIDTH * 0.44,
    borderRadius: 8,
    shadowColor: "#030912",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 7,
  },
  imgCover: {
    marginTop: 10,
    width: "100%",
    resizeMode: "contain",
  },
  container: {
    marginVertical: 12,
    marginHorizontal: 12,
    borderBottomWidth: 3,
    borderColor: "#E7EAEC",
  },
  containerForm: {
    flexDirection: "row",
    marginBottom: 11,
  },
  containerFormTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontWeight: "bold",
    color: "#003031",
  },
  textTitle2: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    marginTop: 2,
    marginStart: 10.5,
  },
  textTitle3: {
    fontSize: 13,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    textAlign: "justify",
  },
  container2: {
    flexDirection: "row",
  },
  containeImage: {
    marginVertical: 12,
    marginHorizontal: 12,
    width: 148,
    height: 100,
  },
  containerDate: {
    flexDirection: "row",
  },
  containeImageText: {
    width: 250,
    height: 100,
    marginTop: 12,
    justifyContent: "space-between",
  },
  titleSection2: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontWeight: "bold",
    color: "#007681",
    marginRight: 48,
  },
  titleDate: {
    paddingStart: 9,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.0025,
    fontWeight: "normal",
    color: "#A1AAB2",
    paddingTop: 2,
  },
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
  containerBody: {
    marginBottom: 20,
  },
  containerBody2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelTitle: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: "#003031",
  },
  labelSubTitle: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#A1AAB2",
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
