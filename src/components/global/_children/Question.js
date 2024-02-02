import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { RadioButton, Snackbar } from "react-native-paper";
import { TextInput } from "react-native-paper";

import { xorBy } from 'lodash'
import SelectBox from 'react-native-multi-selectbox'

import { metrics } from "../../../utilities/Metrics";
const Question = (props) => {
    const [selectedService, setSelectedService] = useState([]);
    const {
        onSubmit, current, question
    } = props || {};
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState("")
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    useEffect(() => {

    })

    function onMultiChange() {
        return (item) => setSelectedService(xorBy(selectedService, [item], 'id'))
    }

    const guardar = () => {

        
        
        
        let respuesta = answer;

        if (question.type === "multiple_answer") {
            respuesta = selectedService
        }


        if (respuesta === "") {
            setVisible(true)
            setError("Debe registrar una respuesta")
        } else {
            setError("")
            onSubmit(respuesta)
            setAnswer("")
        }
    }

    const renderOptions = (question) => {
        console.log(question)
        if (question.type === "simple") {
            return (

                <TextInput onChangeText={setAnswer} value={answer}
                    mode="flat"
                    left={<TextInput.Icon icon="card-text-outline" iconColor="#A1AAB2" />}
                    style={styles.input}
                    theme={{ colors: { primary: '#A1AAB2', underlineColor: 'transparent', } }}
                    placeholderTextColor='#A1AAB2' />
            );
        }
        if (question.type === "multiple_answer") {
            return (

                <SelectBox
                multiOptionContainerStyle={styles.dropdown}
                multiOptionsLabelStyle={styles.dropdownL}
                    label=""
                    inputPlaceholder="Seleccione"
                    options={question.respuestas}
                    selectedValues={selectedService}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                    placeholder="Buscar"
                    hideInputFilter={true}
                    toggleIconColor="#132A3E"
                    arrowIconColor="#132A3E"
                    listOptionProps={{nestedScrollEnabled: true,
                        style: { backgroundColor:"white", paddingHorizontal:10},
                     }}
                />
            );
        }
        else {
            const result = [];

            question.respuestas && question.respuestas.forEach((item, index) => {
                let key = `${question.id}-${index}`;



                result.push(
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} key={key}>
                        <RadioButton value={item.desc} />
                        <Text style={styles.labelTitle}>{item.desc}</Text>
                    </View>
                );
            });

            return result;
        }
    };


    return (
        <View style={styles.cardBodyTwo}>

            <View style={{ padding: 10 }}>
                <Text style={styles.labelTitle}>
                    {question.enunciado}
                </Text>

                {question.type === "simple" ?
                    renderOptions(question)
                    :
                    <RadioButton.Group
                        onValueChange={(value) => setAnswer(value)} value={answer}

                    >
                        {renderOptions(question)}
                    </RadioButton.Group>
                }
            </View>

            <View style={{ padding: 10 }}>
                <TouchableHighlight onPress={() => guardar()} style={styles.btnIniciar}>
                    <Text style={styles.labelLogin}>Guardar</Text>
                </TouchableHighlight>
            </View>


            <View style={{ display: "flex", flex: 1, paddingTop: 10, justifyContent: "center", alignItems: "center", margin: "auto" }}>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={3000}
                    action={{
                        label: "X",
                        onPress: () => {
                        },
                    }}
                >
                    {error}
                </Snackbar>
            </View>


        </View>

    )

}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#F4F1F0",
        fontFamily: 'Roboto-Regular'

    },
    radioText: {
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 34,
        letterSpacing: 0.0015,
        textAlign: "left",
        color: "#000000",
        fontFamily: 'Dosis-Regular'
    },
    labelLogin: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 18,
        letterSpacing: 0.00125,
        textAlign: "center",
        paddingVertical: 12,
        fontFamily: 'Dosis-Regular'
    },
    btnIniciar: {
        backgroundColor: "#132A3E",
        height: 42,
        borderRadius: 25,
        margin: 24, bottom: -10

    },
    labelTitle: {
        fontSize: metrics.HEIGHT * 0.030,
        fontFamily: 'Dosis-Bold',
        //lineHeight: 23,
        letterSpacing: 0.005,
        color: "#003031",
        textAlign: "left",
        textAlignVertical: "center",
        padding: 5
    },
    labelTitle2: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 34,
        letterSpacing: 0.0015,
        textAlign: "left",
        color: "#007681",
        fontFamily: 'Dosis-Regular'
    },
    cardBodyTwo: {
        backgroundColor: "#FFFFFF",
        //flexDirection: "column",
        height: metrics.HEIGHT * 0.30,
        width: metrics.WIDTH * 0.80,
        borderRadius: 8,
        shadowColor: "#030912",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 7,
        marginTop: 10
    },
    dropdown: {
        backgroundColor: '#132A3E',
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        
    },
    dropdownL:{
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 18,
        letterSpacing: 0.00125,
        textAlign: "center",
        fontFamily: 'Dosis-Regular'
    }
});
export default Question;