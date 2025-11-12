/*
 * ==============================================================================
 *
 *   WARNING: THIS FILE IS IN THE ROOT DIRECTORY AND IS NOT DEPLOYED.
 *
 *   To make changes to the application, please edit the corresponding file
 *   in the '/public' directory. For this file, edit:
 *
 *   '/public/services/firebase.ts'
 *
 * ==============================================================================
 */
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWWx7nCOO-Pjpm-mLRgRegIjvyUccru4Y",
  authDomain: "ambitiontrac-20009663-2a986.firebaseapp.com",
  projectId: "ambitiontrac-20009663-2a986",
  storageBucket: "ambitiontrac-20009663-2a986.appspot.com",
  messagingSenderId: "766114094903",
  appId: "1:766114094903:web:94f55c78f99223d3e544b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);