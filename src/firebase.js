import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoeVfDXv5c6O0auBApoNcd0wePgYb5rTE",
  authDomain: "react-firebase-crud-de170.firebaseapp.com",
  databaseURL: "https://react-firebase-crud-de170.firebaseio.com",
  projectId: "react-firebase-crud-de170",
  storageBucket: "react-firebase-crud-de170.appspot.com",
  messagingSenderId: "778361328727",
  appId: "1:778361328727:web:dd9a2dec582b638f15ff12"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
