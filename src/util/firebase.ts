// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzsFWFpR-TXhovPV4J1dwDqervS1Dmnlc",
  authDomain: "consultas-ya-causa.firebaseapp.com",
  projectId: "consultas-ya-causa",
  storageBucket: "consultas-ya-causa.appspot.com",
  messagingSenderId: "751175734277",
  appId: "1:751175734277:web:5056caf6ff643fbf30b86c",
  measurementId: "G-S25J8866MM"
};
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
export default db;

