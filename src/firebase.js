import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCYevdtJFC2gj_teQQT6cNXekwKjZeUxs0",
    authDomain: "safespace-72b87.firebaseapp.com",
    projectId: "safespace-72b87",
    storageBucket: "safespace-72b87.appspot.com",
    messagingSenderId: "265645064412",
    appId: "1:265645064412:web:da2518985cd8850b1cf419"
  };
  
firebase.initializeApp(firebaseConfig);

export default firebase