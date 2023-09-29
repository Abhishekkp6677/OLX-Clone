// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVMjQj3lIXHsSZUOV-2IkmW_X5aGyt4_I",
  authDomain: "olx-clone-ad5de.firebaseapp.com",
  projectId: "olx-clone-ad5de",
  storageBucket: "olx-clone-ad5de.appspot.com",
  messagingSenderId: "940035124209",
  appId: "1:940035124209:web:f008171b2275456ed2b250",
  measurementId: "G-VMWXPDZ6W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage = getStorage(app);