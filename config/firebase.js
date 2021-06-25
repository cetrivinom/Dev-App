import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
