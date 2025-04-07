import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpn57MOSjjZC_vGxw5DgaDg6rz9pvFUYs",
  authDomain: "clone-65ace.firebaseapp.com",
  projectId: "clone-65ace",
  storageBucket: "clone-65ace.firebasestorage.app",
  messagingSenderId: "42358593490",
  appId: "1:42358593490:web:6d8916f6728115a1281a0b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
