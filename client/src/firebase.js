
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-update.firebaseapp.com",
  projectId: "real-estate-app-update",
  storageBucket: "real-estate-app-update.appspot.com",
  messagingSenderId: "667490807577",
  appId: "1:667490807577:web:6ab7c996605b586a835f88"
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);



