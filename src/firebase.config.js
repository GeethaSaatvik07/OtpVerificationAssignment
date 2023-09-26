// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX17r3kkfpSvUNxJby7hrqGFjAEab034o",
  authDomain: "otpcheck-d7eb4.firebaseapp.com",
  projectId: "otpcheck-d7eb4",
  storageBucket: "otpcheck-d7eb4.appspot.com",
  messagingSenderId: "446137818045",
  appId: "1:446137818045:web:2e939b8f6a7d06f654d0d4",
  measurementId: "G-PMGZZZ83ZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
