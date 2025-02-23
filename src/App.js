import { useState, useEffect } from "react";
import MeetupForm from "./MeetupForm";
import { db } from "./firebase"; 
import { collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore"; 
import "./App.css";

function App() {
  const [meetups, setMeetups] = useState([]);

  // Fetch meetups from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "meetups"), (snapshot) => {
      const meetupList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMeetups(meetupList);
    });

    return () => unsubscribe(); // Cleanup Firestore listener
  }, []);

  // Function to delete a meetup
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "meetups", id)); // Delete from Firestore
      alert("Meetup deleted successfully!");
    } catch (error) {
      console.error("Error deleting meetup:", error);
      alert("Failed to delete meetup. Try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Ascend Meetups</h1>
        <p>Connect with people at your favorite cafes in Westminster!</p>
      </header>
      
      <MeetupForm />
      
      <h2>Upcoming Meetups</h2>
      <ul>
        {meetups.map((meetup) => (
          <li key={meetup.id}>
            <strong>{meetup.name}</strong> at {meetup.location} on {meetup.date} at {meetup.time}
            <button className="delete-button" onClick={() => handleDelete(meetup.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
