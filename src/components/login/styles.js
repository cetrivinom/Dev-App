import { StyleSheet } from "react-native";
import { metrics } from "../../utilities/Metrics";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#00AAAD",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    height: metrics.HEIGHT*0.6,
    width: metrics.WIDTH,
    backgroundColor: "#00AAAD",
  },
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: metrics.HEIGHT*0.03,
    height: metrics.HEIGHT*0.19,
  },
});
