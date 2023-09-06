import { useState, useContext, useEffect, useRef } from "react";
import Header from "../global/_children/HeaderBack";
import ModalFilter from "./_children/ModalFilter";
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Linking
} from "react-native";
import { metrics } from "../../utilities/Metrics";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IOMContext from "../../../context/iomData/iomContext";
import AuthContext from "../../../context/auth/authContext";
import { TextInput } from "react-native-paper";
const Integracion = ({ route, navigation }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [arregloServicios, setArregloServicios] = useState([]);
    const [arregloDepartamentos, setArregloDepartamentos] = useState([]);
    const [arregloEmpleo, setArregloEmpleo] = useState([]);
    const [arregloEmprendimiento, setArregloEmprendimiento] = useState([]);
    const dropdownRef1 = useRef({});
    const dropdownRef2 = useRef({});
    const {
        dataPointState,
        dataPoint,
        dataPointDepartamento,
        dataPointMunicipio,
        getDataPoint,
        dataMapeoService,
        getDataPointFilter,
        getDataMapeoService,
        getDataByDepartId,
        dataItem,
    } = useContext(IOMContext);
    const { dataDirectory, getDataDirectory } = useContext(IOMContext);
    const { dataEnlace } = useContext(IOMContext);
    const { config } = useContext(AuthContext);

    const [arregloEnlaces, setArregloEnlaces] = useState([]);

    useEffect(() => {

        setArregloEnlaces(config.configMenuIntegracion)





        if (dataPoint && dataPoint.length < 1) {
            getDataPoint(config.activeStates, config.activeVisible, config.activeType);
        }
        getDataMapeoService();

        var arr = [];
        dataMapeoService.map(index => {
            if (index.id_sector === config.idSectorIntegracion) {


                arr.push(index.servicio);
            }

        })

        setArregloServicios(arr);


        var arr2 = [];
        dataPointDepartamento && dataPointDepartamento.map(index => {

            arr2.push(index);

        })

        setArregloDepartamentos(arr2)


    }, [dataPointDepartamento]);

    const [show, setShow] = useState(false);

    const [servicio, setServicio] = useState([]);
    const [departamento, setDepartamento] = useState("");


    const onPressFilter = () => {

        let textobusqueda = searchTerm.trim();
        let array1 = [];
        if (servicio.length > 0) {

            let servicioA = dataMapeoService
                .filter((item) => {
                    return item.servicio.trim() === servicio.trim()

                })


            servicioA.map(index => {

                array1.push({ item: index.servicio });

            })
        } else {
            dataMapeoService.map(index => {
                if (index.id_sector === config.idSectorIntegracion) {
                    array1.push({ item: index.servicio });
                }

            })
        }




        getDataPointFilter(departamento, "", "", array1, textobusqueda);

        //Obtener Lineas

        lineasArray = [];
        dataDirectory.forEach((u) => {
            u.LineasTelefonicas.forEach((t) => {



                if (t.sector_id === config.idSectorIntegracion) {
                    arra = {
                        departamento: u.departamento,
                        id: t.id + "_" + u.departamento + t.tipo_de_linea_id,
                        NombreOrganizacion: t.NombreOrganizacion,
                        tipo_de_linea: t.tipo_de_linea,
                        telefono: t.telefono_[0]?.value,
                        horario: t.horario

                    }
                    lineasArray.push(arra)
                }


            })
        })

        let lineasPorDep = lineasArray;
        if (departamento !== "") {
            lineasPorDep = lineasArray
                .filter((item) => {
                    return item.departamento.trim() === departamento.trim()

                })
        }





        let lineasPorBusqueda = lineasPorDep;
        if (textobusqueda !== "") {
            lineasPorBusqueda = lineasPorDep
                .filter((item) => {

                    return item.NombreOrganizacion.toLowerCase().includes(textobusqueda.toLowerCase()) || item.tipo_de_linea.toLowerCase().includes(textobusqueda.toLowerCase())

                })

        }







        navigation.navigate("IntegracionResultFilter", {
            servicio,
            departamento,
            array1,
            lineasPorBusqueda,
            textobusqueda
        });
    }

    const onPressCancel = () => {
        setServicio([]);
        setDepartamento("");
        dropdownRef1.current.reset()
        dropdownRef2.current.reset()
        setSearchTerm("")
    };

    const abrirEnlace = (textoFiltro) => {

        let enlaceEmpleo = dataEnlace
            .filter((item) => {
                return item.titulo.trim() === textoFiltro

            })

        let enlace = enlaceEmpleo[0];

        let title = enlace.titulo;
        let contenido = enlace.descripcion;
        let image = enlace.img_enlace;
        let links = enlace.link;



        navigation.navigate("EnlaceItem", { title, contenido, image, links });
    };




    return (

        <ScrollView style={styles.container}>
            <Header showBack={true} title="Información para el empleo y el emprendimiento" navigation={navigation} />
            <View style={[styles.box, styles.box2]}>
                <Image style={{ height: metrics.HEIGHT * 0.19, resizeMode: "contain" }}
                    source={require("../../resources/images/ima_integracion.png")}
                />

                <Text style={styles.inputText} >En esta sección encontrarás servicios que te ayudarán a fortalecer temas de emprendimiento, empleabilidad e inclusión financiera.</Text>

                <TextInput
                    value={searchTerm}
                    onChangeText={(e) => setSearchTerm(e)}
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
                            setSearchTerm("")
                        }}
                    />}
                />

                <SelectDropdown
                    ref={dropdownRef1}
                    data={arregloDepartamentos}
                    // defaultValueByIndex={1}
                    // defaultValue={'Egypt'}
                    onSelect={(selectedItem, index) => {
                        setDepartamento(selectedItem)
                    }}
                    defaultButtonText={'Departamento'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                    search
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder={'Buscar'}
                    searchPlaceHolderColor={'darkgrey'}
                    renderSearchInputLeftIcon={() => {
                        return <FontAwesome name={'search'} color={'#444'} size={18} />;
                    }}
                />

                <SelectDropdown
                    ref={dropdownRef2}
                    data={arregloServicios}
                    // defaultValueByIndex={1}
                    // defaultValue={'Egypt'}
                    onSelect={(selectedItem, index) => {
                        setServicio(selectedItem)
                    }}
                    defaultButtonText={'Servicios'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                    search
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder={'Buscar'}
                    searchPlaceHolderColor={'darkgrey'}
                    renderSearchInputLeftIcon={() => {
                        return <FontAwesome name={'search'} color={'#444'} size={18} />;
                    }}
                />

                <View style={styles.box7}>
                    <TouchableOpacity style={[styles.caja1]} onPress={onPressCancel}>
                        <Text style={styles.textBoxCaja}>Borrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.caja1, styles.caja2]}
                        onPress={onPressFilter}
                    >
                        <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
                            Filtrar
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.textBoxCaja}>Enlaces de interés</Text>
                </View>
                {arregloEnlaces?.tipo === "filtro" &&
                    <View style={{ flexDirection: 'row', margin: 20 }}>

                        {arregloEnlaces.filtro.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={index < arregloEnlaces.filtro.length - 1 ? styles.boxOpenLink : styles.boxOpenLink2}
                                    onPress={() => abrirEnlace(item.textoFiltro)}
                                    key={index}
                                >
                                    <Text style={styles.textOpenLink}>{item.textoEnlace}</Text>

                                </TouchableOpacity>
                            )
                        })
                        }



                    </View>
                }

                {arregloEnlaces?.tipo === "enlace" &&
                    <View style={{ flexDirection: 'row', margin: 20 }}>

                        {arregloEnlaces.enlace.map((item, index) => {
                            return (
                                <TouchableOpacity
                                key={index}
                                    style={index < arregloEnlaces.filtro.length - 1 ? styles.boxOpenLink : styles.boxOpenLink2}
                                    onPress={() => Linking.openURL(item.enlace)}
                                >
                                    <Text style={styles.textOpenLink}>{item.textoEnlace}</Text>

                                </TouchableOpacity>
                            )
                        })
                        }



                    </View>
                }
            </View>


        </ScrollView>
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
        flex: 1.5,
        marginBottom: 10,
    },
    box2: {
        flex: 10,
        marginTop: 31,
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
        marginBottom: 33,
        marginTop: 10,
    },
    box7: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 30,
    },
    caja1: {
        justifyContent: "center",
        alignItems: "center",
        height: 42,
        borderWidth: 1,
        width: metrics.WIDTH * 0.42,
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
    inputText: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#003031",
        lineHeight: 23,
        letterSpacing: 0.0015,
        fontFamily: 'Dosis-Regular',
        textAlign: "left",
        marginVertical: 5
    },
    inputTextBox: {
        backgroundColor: "#FFF",
        paddingLeft: 15,
        color: "#000",
        borderRadius: 50,
        height: 40,
        marginTop: 10,
        backgroundColor: "#FFF",
        fontSize: 14,
        textAlign: "center"

    },
    dropdown1BtnStyle: {
        marginTop: 10,
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#A1AAB2',
    },
    dropdown1BtnTxtStyle: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#425565",
        lineHeight: 19,
        letterSpacing: 0.005,
    },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#003031",
        lineHeight: 23,
        letterSpacing: 0.0015,
        marginStart: 12,
        fontFamily: 'Dosis-Regular'
    },
    dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    boxOpenLink: {
        justifyContent: "center",
        paddingVertical: metrics.HEIGHT * 0.01,
        flexDirection: "row",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#00AAAD",
        flex: 0.5,
        paddingHorizontal: 10
    },
    boxOpenLink2: {
        justifyContent: "center",
        paddingVertical: metrics.HEIGHT * 0.01,
        flexDirection: "row",
        alignItems: "center",
        flex: 0.5,
        paddingHorizontal: 10
    },
    textOpenLink: {
        fontSize: 15,
        color: "#00AAAD",
        lineHeight: 18,
        letterSpacing: 0.00125,
        marginRight: 10,
        paddingTop: 5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#00AAAD",
        fontFamily: 'Dosis-Regular'
    },

})

export default Integracion;