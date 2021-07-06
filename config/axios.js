import axios from "axios";
/**
 * Instancia de librería axios la hace un stream hacia el API de servicios
 */
export default axios.create({
  baseURL: `https://dev-mapeo.us.tempcloudsite.com/sites/default/files/appgifmm/`,
});
