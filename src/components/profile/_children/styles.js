import { StyleSheet } from "react-native";
import { metrics } from "../../../utilities/Metrics";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1,
  },
  //content
  box2: {
    flex: 10,
  },
  container: {
    marginTop: 40,
    marginHorizontal: 15
    },
  containerBodyLogOff: {
    marginTop: 20,
    marginLeft: 10,
  },
  containerHeader: {
    height: 56,
    alignItems: "center",
    backgroundColor: "#00AAAD",
    justifyContent: "center",
  },
  containerForm: {
    flexDirection: "row",
  },
  labelTitleHeader: {
    fontSize: 22,
    fontWeight: "500",
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily:'Dosis-Medium'
  },
  labelTitleLogOff: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    color: "#00AAAD",
    fontFamily:'Dosis-Regular'
  },
  iconLeft: {
    position: "absolute",
    right: metrics.WIDTH * 0.50,
  },
  labelTitle: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.0015,
    color: "#003031",
    marginBottom: 32,
    fontFamily:'Dosis-Bold'
  },
  labelItem: {
    fontSize: 18,
    marginLeft:15,
    letterSpacing: 0.0015,
    color: "#003031",
    fontFamily:'Dosis-Regular'
  },
  labelSaveButton: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 28,
    letterSpacing: 0.0015,
    color: "#00AAAD",
    marginBottom: 32,
    fontFamily:'Dosis-Regular'
  },

  containerForm1: {
    backgroundColor: "red",
    marginBottom: 24,
    paddingLeft: 52,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    height: 48,
  },
  righLine2: {
    position: "absolute",
    left: metrics.WIDTH * 0.67,
  },
  righLine3: {
    position: "absolute",
    backgroundColor: "orange",
    right: metrics.WIDTH * 0.8,
  },
  saveButton: {},
  containerSaveButton: {
    flexDirection: "column",
    flex: 1,
  },
  statusBarBackground:{
    height: (Platform.OS === 'ios') ? metrics.WIDTH * 0.06 : 0,
    backgroundColor: "#00AAAD",
  },  
  inputTextBox: {
    height: 56,
    borderColor: "#A1AAB2",
    borderRadius: 3.5,
    paddingLeft: 15,
    borderWidth: 1,
    marginTop: 30,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A1AAB2',
    height: 56,
    borderRadius: 5,
    marginTop: 30,
    //margin: 10,
  },
  ImageStyle: {
      margin: 14,
      height: 20,
      width: 18,
      resizeMode: 'stretch',
      alignItems: 'center',
  },
  SectionStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.HEIGHT*0.032,
    /*borderWidth: 1,
    borderColor: '#A1AAB2',
    height: 56,
    borderRadius: 5,
    marginTop: 30,*/
    //margin: 10,
  },
  sectionGender:{
    backgroundColor:'rgba(0, 170, 173, 0.2)',
    flex:0.15,
    height:metrics.HEIGHT*0.055,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius:5,
    borderTopLeftRadius:5
  },
  sectionLabel:{
    backgroundColor:'#E7EAEC',
    flex:0.7,
    height:metrics.HEIGHT*0.055,
    justifyContent: 'center'
  },
  sectionSelect:{
    backgroundColor:'#E7EAEC',
    flex:0.15,
    height:metrics.HEIGHT*0.055,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius:5,
    borderTopRightRadius:5
  },
  ImageStyle1: {
      //margin: 14,
      //height: 20,
      //width: 18,
      //resizeMode: 'stretch',
      borderTopLeftRadius:30,
      borderBottomLeftRadius:30,
      borderRadius:50,
  }
});
