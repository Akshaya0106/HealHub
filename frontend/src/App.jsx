import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Providers from './pages/Providers';
import ProviderProfile from './pages/ProviderProfile';
import Messaging from './pages/Messages';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/About';
import AIChatbotPage from './pages/AIChatbotPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/services" element={<Services />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/messages" element={<Messaging />} />
        <Route path="/aichat" element={<AIChatbotPage/>} />
        
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
