// FIX: Changed to a namespace import to address an issue where `initializeApp` was not being resolved as a named export.
import * as firebase from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA302XliSuUdg3-a7eK2SYCOPHVL7dXXbs",
  authDomain: "ambitiontrac.firebaseapp.com",
  databaseURL: "https://ambitiontrac-default-rtdb.firebaseio.com",
  projectId: "ambitiontrac",
  storageBucket: "ambitiontrac.appspot.com",
  messagingSenderId: "770164060051",
  appId: "1:770164060051:web:37a23bd476a36250578266",
  measurementId: "G-QNDK4KHX6D"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const database = getDatabase(app);