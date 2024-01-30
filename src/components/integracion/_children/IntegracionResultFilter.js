import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import Header from "../../global/_children/HeaderBack";
import { Text, KeyboardAvoidingView, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import IOMContext from "../../../../context/iomData/iomContext";
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Snackbar, HelperText, TextInput } from "react-native-paper";
import moment from "moment";
import AuthContext from "../../../../context/auth/authContext";



const IntegracionResultFilter = (props) => {

    const FirstRoute = () => (
        <View style={[styles.box, styles.box2, styles.list]}>
            <FlatList
                data={resultadoServicios}
                ListHeaderComponent={() => (resultadoServicios.length === 0 ?
                    <Text style={styles.emptyMessageStyle}>No hay resultados</Text>
                    : null)
                }
                renderItem={awesomeChildListRenderItem}
                keyExtractor={awesomeChildListKeyExtractor}
            />
        </View>
    );

    const SecondRoute = () => (
        <View style={[styles.box, styles.box2, styles.list]}>
            <FlatList
                data={resultadoLineas}
                renderItem={awesomeChildListRenderItemL}
                keyExtractor={awesomeChildListKeyExtractorL}
            />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute
        //,second: SecondRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Puntos de Servicio' }
        //,{ key: 'second', title: 'Lineas Telefonicas' },
    ]);

    const [resultadoLineas, setResultadoLineas] = useState([])
    const [resultadoLineasI, setResultadoLineasI] = useState([])
    const [resultadoServicios, setResultadoServicios] = useState([])
    const [resultadoServiciosI, setResultadoServiciosI] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const {
        servicio = "",
        array1 = [],
        departamento = "",
        lineasPorBusqueda = [],
        textobusqueda = ""
    } = props.route.params || {};

    const { dataPointFilter, dataMapeoState, getDataPointFilter } = useContext(IOMContext);
    const { user,createAnalytics } = useContext(AuthContext);

    useEffect(() => {

        setResultadoLineas(lineasPorBusqueda);
        setResultadoLineasI(lineasPorBusqueda);
        setResultadoServicios(dataPointFilter);
        setResultadoServiciosI(dataPointFilter);

    }, []);

    const onPressClose = () => {
        props.navigation.goBack();
    };

    const buscar = (textobusqueda) => {


        setSearchTerm(textobusqueda)

        let lineas = resultadoLineasI;
        if (textobusqueda !== "") {
            lineas = resultadoLineasI
                .filter((item) => {
                    return item.NombreOrganizacion.trim().toLowerCase().includes(textobusqueda.trim()) || item.tipo_de_linea.trim().toLowerCase().includes(textobusqueda.trim().toLowerCase())

                })

        }
        setResultadoLineas(lineas);


        let servicios = resultadoServiciosI;
        if (textobusqueda !== "") {
            servicios = resultadoServiciosI
                .filter((item) => {
                    return item.Nombre_punto.trim().toLowerCase().includes(textobusqueda.trim().toLowerCase())

                })

        }

        setResultadoServicios(servicios);

    };


    const guardarLogAnalytics = (nombre) => {

        if (user !== null && user !== undefined) {
    
    
          var array = {
            fecha: moment().format('DD/MM/YY, HH:mm:ss'),
            evento: "consultar_punto_integracion",
            value: nombre
          }
    
          createAnalytics(user, array)
    
    
        }
    
    
      }



    const onPressOpenPoint = (id, Coordenadas, Estado_id, nombre) => {

        let nombreA = nombre.replace(/ /g, "_") + "|Mapeo_De_Servicios_Colombia_GIFMM";
        let nombreB = nombre;

        guardarLogAnalytics(nombreB)

        /*analytics().logScreenView({
            screen_name: nombreA,
            screen_class: nombreA,
        });*/


        let coor = Coordenadas.split(",");
        let latitude = parseFloat(coor[0]);
        let longitude = parseFloat(coor[1]);
        let icon = (dataMapeoState.find((state) => state.id_estado == Estado_id));
        let uri = icon?.img_estado_b64;
        props.navigation.navigate("PointItem", { id, latitude, longitude, uri, from: "SettingsStack" });
    };


    const awesomeChildListKeyExtractor = (item) => item.ID;
    const awesomeChildListKeyExtractorL = (item) => item.id;

    const awesomeChildListRenderItem = ({ item }) => {
        return (
            <View style={styles.container1}>
                <View style={styles.viewTitulo}>
                    <Text style={styles.tituloTexto}>{item.Nombre_punto}</Text>
                    <TouchableOpacity
                        style={[styles.caja1, styles.caja2]}
                        onPress={() => onPressOpenPoint(item.ID, item.Coordenadas, item.Estado_id, item.Nombre_punto)}
                    >
                        <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
                            Conocer más
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.tituloUbicacion}>{item.Departamento}-{item.Municipio}</Text>
                <Text style={styles.tituloEmail}>{item.Direccion}</Text>


            </View>
        )
    };
    const awesomeChildListRenderItemL = ({ item }) => {
        return (
            <View style={styles.container1}>
                <View style={styles.viewTitulo}>
                    <Text style={styles.tituloTexto}>{item.NombreOrganizacion}</Text>

                </View>

                <Text style={styles.tituloUbicacion}>{item.departamento}</Text>
                <Text style={styles.textTitle2}>{item.tipo_de_linea}</Text>
                <Text style={styles.textTitle2}>{item.horario}</Text>
                <Text style={styles.textTitle2}>{item.telefono}</Text>


            </View>
        )
    };

    const renderLabel = ({ route, focused, color }) => {
        return (
            <View style={{ flex: 1, margin: 0, justifyContent: 'space-evenly' }}>
                <Text
                    style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
                >
                    {route.title}
                </Text>

                <View style={{
                    width: 100,
                    height: 10,            // as much as you want to 'Stretch' the underline

                }} />

            </View>

        )
    }

    const renderTabBar = props => (
        <TabBar
            {...props}
            style={{
                backgroundColor: '#FFFFFF', elevation: 0,
                shadowOpacity: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16,
                borderBottomWidth: 0
            }}
            renderLabel={renderLabel}
            indicatorStyle={{
                height: null,
                top: 0,
                backgroundColor: '#00AAAD',
            }}

        />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header showBack={true} title="Información para el empleo y el emprendimiento" navigation={props.navigation} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled >

                <View flexDirection="row" justifyContent="space-between" alignItems="center" style={{ paddingHorizontal: 10, backgroundColor: "#E6F7F7" }}>
                    <TextInput
                        value={searchTerm}
                        onChangeText={(e) => buscar(e)}
                        placeholder="Buscar por palabra"
                        mode="flat"
                        left={<TextInput.Icon icon="magnify" iconColor="#A1AAB2" />}
                        style={styles.inputTextBox}
                        theme={{ colors: { primary: 'transparent', underlineColor: 'transparent', }, roundness: 50 }}
                        placeholderTextColor='#A1AAB2'
                        underlineColorAndroid="transparent"
                        underlineColor="transparent"
                        right={<TextInput.Icon
                            icon={"close"} // where <Icon /> is any component from vector-icons or anything else
                            iconColor="#A1AAB2"
                            onPress={() => {
                                buscar("")
                            }}
                        />}
                    />
                    <TouchableOpacity onPress={onPressClose} >
                        <Text style={styles.labelTitle2}>Volver a filtrar</Text>
                    </TouchableOpacity>
                </View>



                {(servicio !== "" || textobusqueda !== "" || departamento !== "") &&
                    <View alignItems="center" style={{ backgroundColor: "#E6F7F7", paddingBottom: 5 }}>
                        {servicio != "" &&
                            <Text style={styles.labelTitle1}>
                                {servicio}
                            </Text>
                        }
                        {textobusqueda !== "" &&
                            <Text style={styles.labelTitle1}>
                                {textobusqueda}
                            </Text>
                        }{departamento !== "" &&
                            <Text style={styles.labelTitle1}>
                                {departamento}
                            </Text>
                        }
                    </View>
                }

                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

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
        marginBottom: 10,
    },
    box2: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    containerHeader: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    containerFormHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        //padding: 5,
        //paddingHorizontal: 5,
    },
    containerFormHeader2: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        flex: 1,
    },
    labelTitle1: {
        fontWeight: "normal",
        color: "#007681",
        lineHeight: 23,
        fontSize: 14,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Regular',
        textAlign: "center",
        textTransform: "uppercase"
    },
    labelTitle2: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#902857",
        lineHeight: 14,
        letterSpacing: 0.004,
        lineHeight: 23,
        letterSpacing: 0.0015,
    },
    container1: {
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#E7EAEC",
    },
    tituloTexto: {
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Bold',
        color: "#003031",
        flex: 1
    },
    tituloSeccion: {
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Bold',
    },
    tituloCompania: {
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Regular',
        color: "#00AAAD",
        textTransform: 'capitalize',
    },
    viewTitulo: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-start",
        paddingBottom: 10,
    },
    tituloUbicacion: {
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Bold',
        color: "#902857",
        textTransform: 'capitalize',
    },
    tituloDesc: {
        fontSize: 15,
        color: "#00AAAD",
        lineHeight: 18,
        letterSpacing: 0.00125,
        marginRight: 10,
        paddingTop: 5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#00AAAD",

    },
    tituloEmail: {
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Regular',
        color: "#00AAAD",
        textTransform: 'capitalize',
    },
    tituloTelefono: {
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Regular',
        color: "#00AAAD",
        textTransform: 'capitalize',
    },
    textWrap: {
        flexDirection: 'row'
    },
    caja1: {
        justifyContent: "center",
        alignItems: "center",
        height: 34,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "#A1AAB2",
        marginStart: 10,
        paddingHorizontal: 10
    },
    caja2: {
        backgroundColor: "#132A3E",
    },
    textBoxCaja: {
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 18,
        letterSpacing: 0.0125,
        color: "#132A3E",
    },
    textBoxCajaNegra: {
        color: "#FFFFFF",
    },
    inputTextBox: {
        margin: 10,
        height: 40,
        backgroundColor: "#FFF",
        flex: 0.95,
        fontSize: 14,
        borderRadius: 50,
        textAlign: "center"

    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        padding: 10,
    },
    textTitle2: {
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 16,
        letterSpacing: 0.0025,
        color: "#003031",
        flex: 0.95,
    },
    list: {
        paddingBottom: 10
    },
    divider: {
        height: 1,
        backgroundColor: "#007681"

    },
    activeTabTextColor: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: "500",
        lineHeight: 27.81,
        letterSpacing: 0.005,
        textAlign: "center",


    },
    tabTextColor: {
        color: '#A1AAB2',
        fontSize: 15,
        fontWeight: "500",
        lineHeight: 27.81,
        letterSpacing: 0.005,
        textAlign: "center",

    },
    emptyMessageStyle: {
        textAlign: 'center',
        //My current hack to center it vertically
        //Which does not work as expected
        marginTop: '20%',
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 16,
        letterSpacing: 0.0025,
        color: "#003031",
        flex: 0.95,
    }


})

export default IntegracionResultFilter