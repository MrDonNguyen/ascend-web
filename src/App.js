import React, { useState, useEffect } from "react";
import { db } from "./firebase";  // Import Firestore
import { collection, getDocs } from "firebase/firestore";  // Firestore methods
import './App.css'; // Make sure the styles are imported correctly

function App() {
  const [meetups, setMeetups] = useState([]);

  // Fetch meetups from Firestore when the component loads
  useEffect(() => {
    const fetchMeetups = async () => {
      const querySnapshot = await getDocs(collection(db, "meetups"));
      const meetupList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMeetups(meetupList);
    };

    fetchMeetups();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Ascend Meetups</h1>
        <p>Connect with people at your favorite cafes in Westminster!</p>
      </header>

      <h2>Upcoming Meetups</h2>
      <ul>
        {meetups.map((meetup) => (
          <li key={meetup.id}>
            <strong>{meetup.name}</strong> at {meetup.location} on {meetup.date} at {meetup.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
