// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDQRET7y-cGo6QhMOG1CRsazLHK9wbjWA",
  authDomain: "stackoverflow-4e73c.firebaseapp.com",
  projectId: "stackoverflow-4e73c",
  storageBucket: "stackoverflow-4e73c.firebasestorage.app",
  messagingSenderId: "19336581589",
  appId: "1:19336581589:web:16e2bec7221c9cd06b6d5c",
  measurementId: "G-9WC4ECJN0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };