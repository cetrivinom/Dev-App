import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/analytics";
/**
 * Instancia de firebase para realizar consultas, actualizacion y registro de datos
 */
const firebaseConfig = {
  apiKey: "AIzaSyB--W4wRJJcoUEOaU-UdMRzkVkPRZdSMfo",
  authDomain: "oimcol.firebaseapp.com",
  databaseURL: "https://oimcol-default-rtdb.firebaseio.com",
  projectId: "oimcol",
  storageBucket: "oimcol.appspot.com",
  messagingSenderId: "70900825873",
  appId: "1:70900825873:web:61a38976380b3819e396b0",
  measurementId: "G-REHXBLGDBH",
};
/**
 * Inicializa firebase si aun no ha sido instanciada, se ejecuta al inicar el app
 */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
