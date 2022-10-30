// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB4KaS8ednGKImieDpup05N83LYd6J50E",
  authDomain: "react-course-7ddc5.firebaseapp.com",
  projectId: "react-course-7ddc5",
  storageBucket: "react-course-7ddc5.appspot.com",
  messagingSenderId: "696408968873",
  appId: "1:696408968873:web:8560299fa13a72d815a3b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)