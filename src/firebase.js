import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ascend-meetups.firebaseapp.com",
  projectId: "ascend-meetups",
  storageBucket: "ascend-meetups.appspot.com",
  messagingSenderId: "136387470685",
  appId: "1:136387470685:web:2ebda3e447bdb409c174b4",
  measurementId: "G-RKFTWYK3BV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
