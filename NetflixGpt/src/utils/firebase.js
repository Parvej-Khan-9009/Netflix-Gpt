// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtVwMu1awEVCKmSz8nO96pgm-ZWDYC-kg",
  authDomain: "netflix-gpt-31647.firebaseapp.com",
  projectId: "netflix-gpt-31647",
  storageBucket: "netflix-gpt-31647.firebasestorage.app",
  messagingSenderId: "771131611255",
  appId: "1:771131611255:web:1c171f112e2cd61d8f0e72",
  measurementId: "G-2NBP0C962G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

export default auth;