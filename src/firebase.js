import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // Now it's hidden!
  authDomain: "ascend-meetups.firebaseapp.com",
  projectId: "ascend-meetups",
  storageBucket: "ascend-meetups.appspot.com",
  messagingSenderId: "136387470685",
  appId: "1:136387470685:web:df428b6ba5605ef9c174b4",
  measurementId: "G-3M7WF1XCLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // ✅ Firestore is now included

// Export Firestore so App.js & MeetupForm.js can use it
export { app, analytics, db }; 
