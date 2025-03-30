import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../assets/navbar.css"
const Navbar = () => {
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-lg navbar-custom px-3">
      <a className="navbar-brand fw-bold" href="/">HealHub</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
            <a className="nav-link" href="/about">AboutUS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/services">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/messages">Messages</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/aichat">AI Chatbot</a>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-light logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
