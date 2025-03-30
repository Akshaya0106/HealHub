import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "./context/AuthContext";  // ✅ Import AuthProvider

import App from './App.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);