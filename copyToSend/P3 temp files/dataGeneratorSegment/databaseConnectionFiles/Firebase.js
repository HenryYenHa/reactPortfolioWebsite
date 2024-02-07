//import firebase from 'firebase/app';
//import 'firebase/auth';

import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/storage";

/* Inception U firebase */

const firebaseConfig = {
  apiKey: "AIzaSyDLiAFtzeZp1A7lW6DBlUAWmdC94GDdfuc",
  authDomain: "inceptionucollegium.firebaseapp.com",
  projectId: "inceptionucollegium",
  storageBucket: "inceptionucollegium.appspot.com",
  messagingSenderId: "184930738270",
  appId: "1:184930738270:web:14bade91198744bdc514cf",
  measurementId: "G-LDGHSN4D3S",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

// module.exports = firebase;
