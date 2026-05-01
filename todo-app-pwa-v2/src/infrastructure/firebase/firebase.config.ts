import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoQrOFBiSBd8nt5wdPG1TuIIQUbTyMPP0",
  authDomain: "prueba-801c3.firebaseapp.com",
  databaseURL: "https://prueba-801c3-default-rtdb.firebaseio.com",
  projectId: "prueba-801c3",
  storageBucket: "prueba-801c3.firebasestorage.app",
  messagingSenderId: "401929712926",
  appId: "1:401929712926:web:b4bb7d8ca24d8327c5050f",
  measurementId: "G-BNXVHQ6YW3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
