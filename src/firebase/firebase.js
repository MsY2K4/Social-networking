// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQgY5u1z-C7iaF71GYGQWFi5ue-K46MmY",
  authDomain: "phos-net.firebaseapp.com",
  projectId: "phos-net",
  storageBucket: "phos-net.appspot.com",
  messagingSenderId: "881732514603",
  appId: "1:881732514603:web:a5ff80e98825603ec28b6e",
  measurementId: "G-HH6ET58F50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);
export{app,auth,firestore,storage}