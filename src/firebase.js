import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Ensure Firebase environment variables are correctly loaded
if (
  !process.env.REACT_APP_FIREBASE_API_KEY ||
  !process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
  !process.env.REACT_APP_FIREBASE_PROJECT_ID ||
  !process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
  !process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
  !process.env.REACT_APP_FIREBASE_APP_ID ||
  !process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
) {
  console.error("❌ Firebase environment variables are missing! Check your .env file.");
}

// ✅ Firebase Configuration - Now using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Log Firebase Initialization (for debugging)
console.log("🚀 Firebase Initialized Successfully!");

export { app, db, auth };
