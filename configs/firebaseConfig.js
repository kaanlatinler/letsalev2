// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "letssale-9ed09.firebaseapp.com",
  projectId: "letssale-9ed09",
  storageBucket: "letssale-9ed09.appspot.com",
  messagingSenderId: "966278400215",
  appId: "1:966278400215:web:2cba1bc345561ae94d4892",
  measurementId: "G-3FVHCX4E9N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
