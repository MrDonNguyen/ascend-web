import React, { useState, useEffect } from "react";
import { db, auth, signInWithGoogle, logout } from "./firebase"; // ✅ Import Firebase Authentication
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth"; // ✅ Listen for Auth State Changes
import "./App.css"; 
import MeetupForm from "./MeetupForm"; 

function App() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // ✅ Track authenticated user

  // ✅ Listen for Firebase Authentication State
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth(); // ✅ Cleanup listener
  }, []);

  // ✅ Fetch meetups with real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "meetups"),
      (snapshot) => {
        const meetupList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data?.name?.trim() || "📍 (Unnamed Meetup)",
            location: data?.location?.trim() || "📍 (No Location Specified)",
            date: data?.date?.trim() || "🗓 (No Date Set)",
            time: data?.time?.trim() || "⏰ (No Time Specified)",
          };
        });
        setMeetups(meetupList);
        setLoading(false);
      },
      (err) => {
        console.error("❌ Firestore Error:", err);
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
      console.error("❌ Error deleting meetup:", err);
      alert("⚠️ Failed to delete meetup. Try again.");
    }
  };

  return (
    <div className="App">
      {/* ✅ Header */}
      <header className="App-header">
        <h1>🌟 Welcome to Ascend Meetups</h1>
        <p>Connect with people at your favorite cafes in Westminster!</p>

        {/* ✅ Show Google Sign-In / Logout */}
        {!user ? (
          <button onClick={signInWithGoogle} className="google-signin-button">
            🔑 Sign in with Google
          </button>
        ) : (
          <div className="user-info">
            <p>👤 {user.displayName}</p>
            <button onClick={logout} className="logout-button">🚪 Sign Out</button>
          </div>
        )}
      </header>

      {/* ✅ Only Show Meetup Form if User is Signed In */}
      {user ? <MeetupForm /> : <p className="signin-message">🔒 Sign in to create a meetup</p>}

      {/* ✅ Upcoming Meetups Section */}
      <main>
        <h2>📅 Upcoming Meetups</h2>

        {loading && <p className="loading-message">Loading meetups...</p>}
        {error && <p className="error-message">{error}</p>}

        <ul className="meetup-list">
          {meetups.length > 0 ? (
            meetups.map((meetup) => (
              <li key={meetup.id} className="meetup-item">
                <strong>{meetup.name}</strong> at {meetup.location} 
                <br /> {meetup.date} at {meetup.time}
                {user && (
                  <button className="delete-button" onClick={() => handleDelete(meetup.id)}>
                    ❌ Delete
                  </button>
                )}
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
