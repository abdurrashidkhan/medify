// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj2THg6hXU2z0pIb5NRBsYkh2LJbdg_m0",
  authDomain: "medify-4902d.firebaseapp.com",
  projectId: "medify-4902d",
  storageBucket: "medify-4902d.firebasestorage.app",
  messagingSenderId: "192370216118",
  appId: "1:192370216118:web:79d9c3df62527ad51cea17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
