import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// ✅ Error Boundary (Prevents crashes & improves UX)
const renderApp = () => {
  try {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("❌ Critical App Render Error:", error);
    alert("⚠️ An unexpected error occurred. Please refresh the page.");
  }
};

// ✅ Render the App
renderApp();

// ✅ Measure performance & analytics (Optional)
reportWebVitals(console.log);
