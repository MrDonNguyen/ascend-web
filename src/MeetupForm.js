import { useState } from "react";
import { db } from "./firebase"; 
import { collection, addDoc } from "firebase/firestore"; 
import DatePicker from "react-datepicker";  // ✅ Import React Datepicker
import "react-datepicker/dist/react-datepicker.css";  // ✅ Import CSS

function MeetupForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);  // Use null instead of empty string
  const [time, setTime] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate inputs before submission
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
        date: date.toISOString().split("T")[0], // Store as YYYY-MM-DD
        time: time.trim(),
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
      <h2 className="form-title">Create a Meetup</h2>

      {/* ✅ Display error messages */}
      {error && <p className="error-message">{error}</p>}

      {/* ✅ Meetup Name Input */}
      <label>Meetup Name</label>
      <input
        type="text"
        placeholder="Enter meetup name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* ✅ Location Input */}
      <label>Location</label>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* ✅ Date Picker (Replaces default input) */}
      <label>Date</label>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy-MM-dd"
        className="datepicker-input"
        placeholderText="Select a date"
        isClearable
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
      />

      {/* ✅ Time Picker (Dropdown select) */}
      <label>Time</label>
      <select 
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
        className="time-picker"
      >
        <option value="">Select a time</option>
        <option value="08:00">08:00 AM</option>
        <option value="09:00">09:00 AM</option>
        <option value="10:00">10:00 AM</option>
        <option value="11:00">11:00 AM</option>
        <option value="12:00">12:00 PM</option>
        <option value="13:00">01:00 PM</option>
        <option value="14:00">02:00 PM</option>
        <option value="15:00">03:00 PM</option>
        <option value="16:00">04:00 PM</option>
        <option value="17:00">05:00 PM</option>
        <option value="18:00">06:00 PM</option>
        <option value="19:00">07:00 PM</option>
        <option value="20:00">08:00 PM</option>
        <option value="21:00">09:00 PM</option>
      </select>

      {/* ✅ Submit Button */}
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Add Meetup"}
      </button>
    </form>
  );
}

export default MeetupForm;
