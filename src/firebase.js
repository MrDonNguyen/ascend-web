import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl0eXNLl_g-ULduscwAgoQlU1CVBlxs6M",
  authDomain: "ascend-meetups.firebaseapp.com",
  projectId: "ascend-meetups",
  storageBucket: "ascend-meetups.appspot.com",
  messagingSenderId: "136387470685",
  appId: "1:136387470685:web:df428b6ba5605ef9c174b4",
  measurementId: "G-3M7WF1XCLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Connect to Firestore

export { db };
