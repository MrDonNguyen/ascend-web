import React, { useState, useEffect } from "react";
import { db } from "./firebase"; 
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"; 
import "./App.css"; 
import MeetupForm from "./MeetupForm"; 

function App() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch meetups with real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "meetups"),
      (snapshot) => {
        const meetupList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data?.name && data.name.trim() !== "" ? data.name : "Unnamed Meetup",
            location: data?.location && data.location.trim() !== "" ? data.location : "Unknown Location",
            date: data?.date && data.date.trim() !== "" ? data.date : "No Date Set",
            time: data?.time && data.time.trim() !== "" ? data.time : "No Time Set",
          };
        });
        setMeetups(meetupList);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore Error:", err);
        setError("⚠️ Failed to load meetups. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ✅ Delete Meetup
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "meetups", id));
      alert("🎉 Meetup deleted successfully!");
    } catch (err) {
      console.error("Error deleting meetup:", err);
      alert("⚠️ Failed to delete meetup. Try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌟 Welcome to Ascend Meetups</h1>
        <p>Connect with people at your favorite cafes in Westminster!</p>
      </header>

      <MeetupForm /> 

      <main>
        <h2>📅 Upcoming Meetups</h2>

        {loading && <p>Loading meetups...</p>}
        {error && <p className="error-message">{error}</p>}

        <ul>
          {meetups.length > 0 ? (
            meetups.map((meetup) => (
              <li key={meetup.id} className="meetup-item">
                <strong>📍 {meetup.name}</strong> at {meetup.location} 
                <br /> 🗓 {meetup.date} at ⏰ {meetup.time}
                <button className="delete-button" onClick={() => handleDelete(meetup.id)}>
                  ❌ Delete
                </button>
              </li>
            ))
          ) : (
            !loading && <p>No meetups found. Be the first to create one! 🚀</p>
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
