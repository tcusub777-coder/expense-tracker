// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJcDK-ebO6x7T1dnah2Bsv1BBjbxUbshs",
  authDomain: "expense-tracker-2026-d64e4.firebaseapp.com",
  projectId: "expense-tracker-2026-d64e4",
  storageBucket: "expense-tracker-2026-d64e4.firebasestorage.app",
  messagingSenderId: "766441165693",
  appId: "1:766441165693:web:76fa83ba6f9c854483f214",
  measurementId: "G-J4P97BRVH4"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);