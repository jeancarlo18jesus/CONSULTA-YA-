// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_WktYIKBuCj-7qebMXLyf5lj-vk7U6OQ",
  authDomain: "consultas-ya-causa-1156c.firebaseapp.com",
  projectId: "consultas-ya-causa-1156c",
  storageBucket: "consultas-ya-causa-1156c.appspot.com",
  messagingSenderId: "210711911525",
  appId: "1:210711911525:web:56b759d11d0e8dccfdba8c"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// Export the Firebase connection object
export const ConectionFirebaseDb =  ()=>{
  try{
    console.log('Conectado con Firebase');
    return  getFirestore(appFirebase);
  }catch{
    console.log('Error al conectar con Firebase');
    throw new Error('Error al conectar con Firebase');
  }
}
