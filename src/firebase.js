import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,  // Securely reference the API key from .env
  authDomain: "ascend-meetups.firebaseapp.com",
  projectId: "ascend-meetups",
  storageBucket: "ascend-meetups.appspot.com",
  messagingSenderId: "136387470685",
  appId: "1:136387470685:web:2ebda3e447bdb409c174b4",
  measurementId: "G-RKFTWYK3BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

// Export Firestore and Analytics so other files can use them
export { app, analytics, db };
