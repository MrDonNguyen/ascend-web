import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // ✅ Track authentication state

  // ✅ Handle Email Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("✅ Signed in successfully!");
    } catch (err) {
      setError("⚠️ Invalid email or password. Please try again.");
    }
  };

  // ✅ Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      alert("✅ Signed in with Google!");
    } catch (err) {
      setError("⚠️ Google sign-in failed. Please try again.");
    }
  };

  // ✅ Handle Email Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("✅ Account created successfully!");
    } catch (err) {
      setError("⚠️ Could not create account. Try a stronger password.");
    }
  };

  // ✅ Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("✅ Signed out successfully!");
    } catch (err) {
      setError("⚠️ Failed to sign out. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>{user ? "Welcome Back!" : "Sign In"}</h2>
      {error && <p className="error-message">{error}</p>}

      {/* ✅ Show Login Form if No User is Signed In */}
      {!user ? (
        <>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">🔓 Sign In</button>
          </form>

          {/* ✅ Google Sign-In Button */}
          <button onClick={handleGoogleSignIn} className="google-button">
            🔵 Sign In with Google
          </button>

          <p>Don't have an account?</p>
          <button onClick={handleSignUp} className="signup-button">
            🆕 Sign Up
          </button>
        </>
      ) : (
        // ✅ Show Sign-Out Button if User is Logged In
        <button onClick={handleSignOut} className="logout-button">
          🚪 Sign Out
        </button>
      )}
    </div>
  );
}

export default Login;
