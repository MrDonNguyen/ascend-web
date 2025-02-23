import { useState } from "react";
import { db } from "./firebase"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

function MeetupForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || !date || !time) return;

    try {
      // Add meetup to Firestore
      await addDoc(collection(db, "meetups"), {
        name,
        location,
        date,
        time
      });

      // Clear form after submitting
      setName("");
      setLocation("");
      setDate("");
      setTime("");
      alert("Meetup added successfully!");
    } catch (error) {
      console.error("Error adding meetup: ", error);
      alert("Error adding meetup, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Meetup</h2>
      <input type="text" placeholder="Meetup Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit">Add Meetup</button>
    </form>
  );
}

export default MeetupForm;
