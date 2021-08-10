/* eslint-disable react-native/no-inline-styles */
import React, {useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgCssUri, SvgUri,SvgFromUri,SvgWithCssUri } from 'react-native-svg';
import IOMContext from "../../../../context/iomData/iomContext";

const ServiceItem = (props) => {
  const { dataMapeoService } = useContext(IOMContext);
  var service = dataMapeoService.find((element) => {
    return element.id_servicio === props.Servicio_id;
  })
  return (
    <View style={styles.cajaDireccion}>
      <View style={styles.containerForm}>
        <SvgCssUri
          height='32'
          width='32'
          //uri="https://mapeo-de-servicios.gifmm-colombia.site/sites/default/files/sector/icono/SEGURIDADALIMENTARIA.svg"
          //uri="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBkYXRhLW5hbWU9IkNhcGEgMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTAgNTAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDBhYWFkO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MS4yMSwxMC4zM2EyLjMzLDIuMzMsMCwwLDAtMi4zMSwyLjMyVjI1bC0zLjcxLDMuNzRhLjc1Ljc1LDAsMCwxLTEuMjQuMTMsMSwxLDAsMCwxLDAtMS4zNWwzLjEzLTMuMThhMS42NiwxLjY2LDAsMCwwLDAtMi4zMiwxLjU5LDEuNTksMCwwLDAtMi4yOCwwTDI4LjczLDI4LjJBNSw1LDAsMCwwLDI3LjMzLDMyaDBWNDMuNTNoNi45NFYzNi4wOGE0Ljg1LDQuODUsMCwwLDAsMS4yOS0uOTRsNy4zMS03LjQyYTIuMzEsMi4zMSwwLDAsMCwuNjctMS42NFYxMi42NUEyLjMzLDIuMzMsMCwwLDAsNDEuMjEsMTAuMzNaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjEuMjcsMjguMiwxNS4yLDIyYTEuNTksMS41OSwwLDAsMC0yLjI4LDAsMS42NiwxLjY2LDAsMCwwLDAsMi4zMmwzLjEzLDMuMThhMSwxLDAsMCwxLDAsMS4zNS45MS45MSwwLDAsMS0xLjMyLDBMMTEuMSwyNVYxMi42NWEyLjMyLDIuMzIsMCwxLDAtNC42MywwVjI2LjA4YTIuMzEsMi4zMSwwLDAsMCwuNjcsMS42NGw3LjMxLDcuNDJhNC44NSw0Ljg1LDAsMCwwLDEuMjkuOTR2Ny40NWg2Ljk0VjMyaDBBNSw1LDAsMCwwLDIxLjI3LDI4LjJaIi8+PGNpcmNsZSBjbGFzcz0iY2xzLTEiIGN4PSIyNSIgY3k9IjEzLjQyIiByPSI2Ljk1Ii8+PC9zdmc+"
          //en android el fetch falla con base64, se debe revisar este problema
          uri={(Platform.OS==='ios'?service?.img_servicio_b64:'https://mapeo-de-servicios.gifmm-colombia.site'+service?.img_servicio)}
        />
        <Text style={styles.textTitle2}>{props.Servicio}</Text>
      </View>
      <View style={styles.containerForm2}>
        <Text>{props.Descripcion_Servicio}</Text>
      </View>
      <View style={styles.containerForm2}>
        <Text style={styles.textTitle3}>Organización(es) principal(es)</Text>
        <View>
          <Text style={styles.textTitle4}>{props.Organizacion_es}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cajaDireccion: {
    borderWidth: 1,
    borderColor: "#D0D4D8",
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginBottom: 12,
  },
  containerForm: {
    flexDirection: "row",
    paddingTop: 2,
    paddingLeft: 2,
  },
  textTitle2: {
    flex: 1, 
    flexWrap: 'wrap',
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#007681",
    marginTop: 2,
    marginBottom: 5,
    marginStart: 10.5,
  },
  containerForm2: {
    paddingLeft: 45,
  },
  textTitle3: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    paddingTop: 8,
  },
  textTitle4: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    paddingTop: 8,
  },
});

export default ServiceItem;
