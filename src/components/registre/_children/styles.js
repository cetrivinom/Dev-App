import { StyleSheet } from "react-native";
import { metrics } from "../../../utilities/Metrics";
/**
 * Hoja de estilos aplicadas a RegisterForm
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  box: {
    flex: 1,
  },
  box1: {
    flex: 10,
  },
  //footer
  box2: {
    flex: 2,
  },
  labelTitle: {
    marginTop: 40,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.0015,
    color: "#003031",
    marginBottom: 16,
    fontFamily:'Dosis-Bold'
  },
  labelSubTitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0.005,
    color: "#A1AAB2",
    marginBottom: 32,
    fontFamily:'Dosis-Regular'
  },
  labelBirthdate:{ 
    alignSelf:'center', 
    alignItems: 'center', 
    fontSize: 18,
    lineHeight: 28,
    color: "#003031",
    fontFamily:'Dosis-Regular'
  },
  inputTextBox: {
    flex:1,
    borderColor: "#A1AAB2",
    color: 'black',
    fontSize: 16,
    color: "#000",
    fontFamily:'Dosis-Regular'
  },
  inputTextBoxError: {
    flex:1,
    borderColor: "#A1AAB2",
    color: 'black',
    fontSize: 16,
    fontFamily:'Dosis-Regular'
  },
  labelError: {
    color: "#DD3338",
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.004,
    marginTop: 5,
    paddingLeft: 15,
    fontFamily:'Dosis-Regular'
  },
  btnNext: {
    backgroundColor: "#132A3E",
    height: 42,
    borderRadius: 25,
  },btnNextDis: {
    backgroundColor: "#E7EAEC",
    height: 42,
    borderRadius: 25,

  },
  labelNext: {
    color: "#D0D4D8",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
    width: "100%",
    fontFamily:'Dosis-Regular'
  },
  righLine: {
    position: "absolute",
    top: metrics.HEIGHT * 0.0145,
    left: metrics.WIDTH * 0.83,
  },
  breadcums: {
    marginTop: 30,
    alignSelf: "center",
    paddingHorizontal: 30,
  },
  containerForm: {
    backgroundColor: "#E7EAEC",
    marginBottom: 24,
    paddingLeft: 52,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    height: 48,
  },
  containerForm2: {
    flexDirection: "row",
  },
  righLine2: {
    position: "absolute",
    left: metrics.WIDTH * 0.67,
  },
  righLine3: {
    position: "absolute",
    right: metrics.WIDTH * 0.8,
  },
  containerForm21: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  containerForm3: {
    justifyContent: "center",
    alignItems: "center",
    width: 137,
    height: 82,
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 16,
    borderColor: "#00AAAD",
  },
  containerForm31: {
    backgroundColor: "#00AAAD",
  },
  containerForm4: {
    justifyContent: "center",
    alignItems: "center",
    width: 137,
    height: 82,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 16,
    borderColor: "#902857",
  },
  containerForm41: {
    backgroundColor: "#902857",
  },
  labelTitle1: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    letterSpacing: 0.00125,
    color: "#003031",
    marginBottom: 96,
    fontFamily:'Dosis-Regular'
  },
  labelItemYes: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    color: "#00AAAD",
    fontFamily:'Dosis-Regular'
  },
  labelItemYes1: {
    color: "#FFFFFF",
  },
  labelItemNo: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.0015,
    color: "#902857",
    fontFamily:'Dosis-Regular'
  },
  labelItem: {
    fontSize: 18,
    marginLeft:15,
    letterSpacing: 0.0015,
    color: "#003031",
    fontFamily:'Dosis-Regular'
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A1AAB2',
    height: 56,
    borderRadius: 5,
    marginTop: 30,
  },
  ImageStyle: {
      margin: 14,
      height: 24,
      width: 24,
      resizeMode: 'stretch',
      alignItems: 'center',
  },
  ImageStyle2: {
      margin: 14,
      height: 24,
      width: 18,
      resizeMode: 'stretch',
      alignItems: 'center',
  },
  TerminosStyleDiv: {
    flexDirection: 'row',
    marginTop: 20,
    
  },
  labelTerminoLink: {
    fontSize: 12,
    color: "#00AAAD",
    lineHeight: 18,
    
    
  },
  labelTermino: {
    fontSize: 12,
    color: "#003031",
    lineHeight: 18,
    
  },
});
