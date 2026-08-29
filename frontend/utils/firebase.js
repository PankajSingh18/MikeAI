// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mikeai-9811b.firebaseapp.com",
  projectId: "mikeai-9811b",
  storageBucket: "mikeai-9811b.firebasestorage.app",
  messagingSenderId: "892209259970",
  appId: "1:892209259970:web:ad5c62f64c4bb979c5225b",
  measurementId: "G-GS50ZG4SKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()