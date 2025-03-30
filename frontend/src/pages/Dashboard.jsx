import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/auth/profile", {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    // Fetch providers if user is a victim
    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/providers", {
          headers: { Authorization: token },
        });
        setProviders(res.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchUser();
    fetchProviders();
  }, [navigate]);

  return (
    <div className="container mt-5">
      {user && (
        <>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <nav className="mt-4">
            <Link to="/messages" className="btn btn-primary me-2">Messages</Link>
            <Link to="/profile" className="btn btn-secondary me-2">Profile</Link>
            <button className="btn btn-danger" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
          </nav>

          {user.role === "victim" && (
            <div className="mt-4">
              <h3>Available Service Providers</h3>
              <ul className="list-group">
                {providers.map(provider => (
                  <li key={provider._id} className="list-group-item">
                    {provider.name} - {provider.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
