// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {  GoogleAuthProvider } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAEvsHkVOUtBF2TmBndxn70_luZGOp6io",
    authDomain: "e-commerce-store-a36b3.firebaseapp.com",
    projectId: "e-commerce-store-a36b3",
    storageBucket: "e-commerce-store-a36b3.appspot.com",
    messagingSenderId: "1093002214090",
    appId: "1:1093002214090:web:cfc56d5b22cfbf26d15233",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

// Create a GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();

export { fireDB, auth, googleProvider }; // Export the GoogleAuthProvider