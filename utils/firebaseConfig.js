// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB1unTrLN4ioR6AX1EA2gnxX36y1ujRTg",
  authDomain: "gambet-c7eaa.firebaseapp.com",
  projectId: "gambet-c7eaa",
  storageBucket: "gambet-c7eaa.appspot.com",
  messagingSenderId: "89455780962",
  appId: "1:89455780962:web:5361f3778fe0b719cd5d3b",
  measurementId: "G-JZ3WE7NGKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const storage = getStorage(app);