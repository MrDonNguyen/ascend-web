import { useState } from "react";
import { db, auth } from "./firebase"; // ✅ Import Firebase Authentication
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"; // ✅ Firebase Auth Hook
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MeetupForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth); // ✅ Check if user is authenticated

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prevent submission if user is not signed in
    if (!user) {
      setError("🔒 You must sign in to create a meetup!");
      return;
    }

    // ✅ Validate input fields
    if (!name.trim() || !location.trim() || !date || !time) {
      setError("⚠️ All fields are required!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ Add meetup to Firestore
      await addDoc(collection(db, "meetups"), {
        name: name.trim(),
        location: location.trim(),
        date: date.toISOString().split("T")[0],
        time: time.trim(),
        createdBy: user.email, // ✅ Store who created the meetup
      });

      // ✅ Reset form fields
      setName("");
      setLocation("");
      setDate(null);
      setTime("");
      alert("🎉 Meetup added successfully!");
    } catch (err) {
      console.error("❌ Error adding meetup:", err);
      setError("⚠️ Could not add meetup. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">📅 Create a Meetup</h2>

      {/* ✅ Display error messages */}
      {error && <p className="error-message">{error}</p>}

      {/* ✅ Show Sign-In Warning if Not Logged In */}
      {!user && <p className="signin-warning">🔒 Sign in to create a meetup</p>}

      {/* ✅ Meetup Name Input */}
      <label htmlFor="meetup-name">Meetup Name</label>
      <input
        id="meetup-name"
        type="text"
        placeholder="Enter meetup name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* ✅ Location Input */}
      <label htmlFor="location">Location</label>
      <input
        id="location"
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* ✅ Date Picker (Calendar Dropdown) */}
      <label htmlFor="date">Date</label>
      <DatePicker
        id="date"
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy-MM-dd"
        className="datepicker-input"
        placeholderText="📆 Select a date"
        isClearable
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
      />

      {/* ✅ Time Picker (Dropdown Select) */}
      <label htmlFor="time">Time</label>
      <select 
        id="time"
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
        className="time-picker"
      >
        <option value="">⏰ Select a time</option>
        {Array.from({ length: 24 }, (_, i) => {
          const hour = i < 10 ? `0${i}` : `${i}`;
          const amPm = i < 12 ? "AM" : "PM";
          const displayHour = i === 0 ? "12" : i > 12 ? i - 12 : i;
          return (
            <option key={hour} value={`${hour}:00`}>
              {displayHour}:00 {amPm}
            </option>
          );
        })}
      </select>

      {/* ✅ Submit Button */}
      <button type="submit" disabled={loading || !user}>
        {loading ? "Submitting..." : "➕ Add Meetup"}
      </button>
    </form>
  );
}

export default MeetupForm;
