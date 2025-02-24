import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot in React 18+
import App from "./App";
import "./index.css"; // Ensure styles are applied globally

// Initialize React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
