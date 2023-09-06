/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import React, { useContext } from "react";
import AuthContext from "../../../../context/auth/authContext";
import analytics from '@react-native-firebase/analytics';

const CardItemLink = (props) => {
  const {
    title = "",
    resume = "",
    content = "",
    date = "DD/MM/AAAA",
    image = "",
    links = [],
    navigation
  } = props || {};

  const onPressOpen = () => {

    let nombreA = "Noticias|"+ title.replace(/ /g, "_")+"|Contenido_Interes";

      analytics().logScreenView({
        screen_name: nombreA,
        screen_class: nombreA,
      });

    analytics().logSelectContent({
      content_type: 'news_opened',
      item_id: title,
    })
    props.navigation.navigate("LinkItem", { title, resume, date, content, image, links });
  };
  const { config } = useContext(AuthContext);
  const regex = /(<([^>]+)>)/gi;
  const result = resume.replace(regex, "");
  let _resume = result.substring(0, 60);

  function unescapeHtml(safe) {
    return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'"); 

  }
  return (
    <TouchableOpacity onPress={onPressOpen}>
      <View style={styles.container}>
        <Image
          style={styles.containeImage}
          source={{
            uri: config.photoBaseURL+image,
          }}
        />
        <View style={styles.containeImageText}>
        <Text style={styles.titleSection}>{unescapeHtml(title) + "..."}</Text>
          {/*           <View style={styles.containerDate}>
            <Image source={require("../../../resources/images/calendar.png")} />
            <Text style={styles.titleDate}>{date}</Text>
            <Text style={styles.titleUpdateDate}>Fecha de actualización</Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  containeImage: {
    width: 148,
    height: 100,
  },
  containeImageText: {
    width: metrics.WIDTH - 128,
    justifyContent: "space-between",
    paddingStart: 5,
  },
  titleSection: {
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: "#007681",
    marginRight: 48,
    fontFamily:'Dosis-Bold',
  },
  containerDate: {
    flexDirection: "row",
  },
  titleDate: {
    paddingStart: 9,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.0025,
    fontWeight: "normal",
    color: "#A1AAB2",
    paddingTop: 2,
    fontFamily:'Dosis-Regular'
  },
  titleUpdateDate: {
    paddingStart: 6,
    fontSize: 9,
    lineHeight: 16,
    fontWeight: "normal",
    color: "#A1AAB2",
    paddingTop: 2,
    fontFamily:'Dosis-Regular'
  },

});

export default CardItemLink;
