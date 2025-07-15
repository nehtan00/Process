// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoJCwwuc7n3R6WOtOtg7Oo3tAFaLARpS8",
  authDomain: "process-9be63.firebaseapp.com",
  projectId: "process-9be63",
  storageBucket: "process-9be63.appspot.com",
  messagingSenderId: "148761378953",
  appId: "1:148761378953:web:a3039f1a44c0c614b04658"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 