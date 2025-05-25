// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCyrgsJvlGEeRev1Q4HoHCjRCHu4LHCAPQ",
  authDomain: "moneycontrolhub-fceb8.firebaseapp.com",
  projectId: "moneycontrolhub-fceb8",
  storageBucket: "moneycontrolhub-fceb8.appspot.com", // corrected .app to .com
  messagingSenderId: "481659848531",
  appId: "1:481659848531:web:d5971c0e76910ca7ad43a6",
  measurementId: "G-XVYNJ8YNTT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
};
