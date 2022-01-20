import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Tab, TabView } from 'react-native-elements';
import Header from "../global/_children/Header";
import CardItemLink from "./_children/CardItemLink";
import HeaderFilterLink from "./_children/HeaderFilterLink";
import ModalFilter from "./_children/ModalFilter";
import IOMContext from "../../../context/iomData/iomContext";
import { metrics } from "../../utilities/Metrics";
import { CardEnlaceLink } from "./_children/CardEnlaceLink";
import { CardSocioLink } from "./_children/CardSocioLink";

const Links = (props) => {
  const [showFilterOption, setShowFilterOption] = useState(false);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { dataEnlace, getDataEnlace } = useContext(IOMContext);
  const { dataSocio, getDataSocio } = useContext(IOMContext);
  const { dataLink, dataLinkEtiquetas, getDataLink} = useContext(IOMContext);
  const [index, setIndex] = useState(0);
  const awesomeChildListRenderItem = (item) => (
    <CardItemLink
      {...props}
      title={item.item.Titulo}
      resume={item.item.Resumen}
      content={item.item.Contenido}
      image={item.item.Imagen}
      date={item.item.Fecha}
      links={item.item.EnlaceExterno}
    />
  );
  const awesomeChildListKeyExtractor = (item) => item.Titulo;


  const onPressClose = () => {
    setShowFilterOption((prev) => !prev);
  };

  const onPressFilter = () => {
    getDataLink(searchTerm);
    onPressClose();
  };

  useEffect(() => {
    getDataLink();
    getDataEnlace();
    getDataSocio();
  }, []);

  const toggleModal = () => setShow(!show);
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Contenido de interés" />


        <Tab indicatorStyle={{
          backgroundColor: '#00AAAD',
          height: 3,
          color: '#00AAAD',
        }}
         
        value={index} onChange={setIndex} >
          <Tab.Item title="Noticias" buttonStyle={{ backgroundColor: '#FFFFFF' }} titleStyle={index==0? styles.tabItemStyleEnable:styles.tabItemStyleDisable} />
          <Tab.Item title="Enlaces" buttonStyle={{ backgroundColor: '#FFFFFF' }} titleStyle={index==1? styles.tabItemStyleEnable:styles.tabItemStyleDisable} />
          <Tab.Item title="Socios" buttonStyle={{ backgroundColor: '#FFFFFF' }} titleStyle={index==2? styles.tabItemStyleEnable:styles.tabItemStyleDisable} />
        </Tab>

        <TabView value={index} onChange={setIndex} >
          <TabView.Item onMoveShouldSetResponder={(e) => e.stopPropagation()}>

            <View>
              <HeaderFilterLink setShowFilterOption={setShowFilterOption} />
              {dataLink !== null && (

                <FlatList
                  data={dataLink}
                  renderItem={awesomeChildListRenderItem}
                  keyExtractor={awesomeChildListKeyExtractor}
                />

              )}
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
                    />
                  </View>
                  <View style={styles.box5}>
                    <TouchableOpacity style={styles.box6} onPress={() => setShow(true)}>
                      <Text style={styles.textBox}>
                        {searchTerm != "" ? searchTerm : "Tipo de contenido"}
                      </Text>
                      <Image
                        source={require("../../resources/images/trailingIcon.png")}
                      />
                    </TouchableOpacity>
                    <View style={styles.box7}>
                      <TouchableOpacity
                        style={[styles.caja1]}
                        onPress={() => setSearchTerm("")}
                      >
                        <Text style={styles.textBoxCaja}>Borrar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.caja1, styles.caja2]}
                        onPress={onPressFilter}
                      >
                        <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>Filtrar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              <ModalFilter
                onClose={() => setShow(false)}
                show={show}
                data={dataLinkEtiquetas}
                setSearchTerm={setSearchTerm}
                toggleModal={toggleModal}
              />
            </View>

          </TabView.Item>
          <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
            <ScrollView>
            <View style={styles.containerForm2}>

              {dataEnlace !== null && dataEnlace.map(index => {
                return (
                  <CardEnlaceLink
                  {...props}
                  key = {index.titulo}
                  title={index.titulo}
                  image={index.img_enlace}
                  links = {index.link}
                  contenido={index.descripcion}
                />
                )
              })}

            </View>
            </ScrollView>
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          <ScrollView>
            <View style={styles.containerForm2}>

              {dataSocio !== null && dataSocio.map(index => {
                return (
                  <CardSocioLink
                  {...props}
                  key = {index.id_estado}
                  title={index.estado}
                  image={index.img_socio}
                  links = {index.field_website}
                  contenido = {index.field_descripcion}
                />
                )
              })}

            </View>
            </ScrollView>
          </TabView.Item>
        </TabView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerForm2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding:10
  },
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1.5,
    marginBottom: 10,
  },
  //content
  box2: {
    flex: (Platform.OS === 'ios') ? 8 : 10,
  },
  box3: {
    position: "absolute",
    width: "100%",
    height: 300,
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
    //marginBottom: 100,
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
    marginTop: metrics.HEIGHT * 0.05,
    //mar: metrics.HEIGHT * 0.01,
  },
  caja1: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    borderWidth: 1,
    width: metrics.WIDTH * 0.4,
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
  tabItemStyleEnable:{ 
    fontSize: 16, 
    lineHeight: 19,
    letterSpacing: 0.005, 
    color: '#00AAAD' 
  },
  tabItemStyleDisable:{ 
    fontSize: 16, 
    lineHeight: 19,
    letterSpacing: 0.005, 
    color: '#A1AAB2' 
  }
});

export default Links;
