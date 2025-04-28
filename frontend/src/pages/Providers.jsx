import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Providers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Extract service type from URL
  const queryParams = new URLSearchParams(location.search);
  const selectedService = queryParams.get("service");

  useEffect(() => {
    if (!selectedService) {
      setError("No service selected.");
      setLoading(false);
      return;
    }

    const fetchProviders = async () => {
      try {
        const response = await axios.get("https://healhub-5by5.onrender.com/providers"); // Fetch all providers
        console.log("API Response:", response.data);
        const filteredProviders = response.data.filter(
          (provider) => provider.serviceType === selectedService
        );
        setProviders(filteredProviders);
      } catch (err) {
        setError("Failed to fetch providers.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [selectedService]);

  const handleProviderClick = (providerId) => {
    navigate(`/provider/${providerId}`);
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
  <h2 className="text-center mb-4">{selectedService} Providers</h2>

  {loading && <p className="text-center">Loading providers...</p>}
  {error && <p className="text-center text-danger">{error}</p>}

  <div className="row">
    {providers.length > 0 ? (
      providers.map((provider) => (
        <div key={provider.id || provider._id} className="col-12 mb-4">
          <div className="card shadow-lg p-4 provider-card d-flex flex-row align-items-center">
            <div className="icon-container text-primary me-3">
              <i className="bi bi-person-circle" style={{ fontSize: "2rem" }}></i>
            </div>
            <div className="flex-grow-1">
              <h5 className="mb-1 fw-bold">{provider.name}</h5>
              <p className="text-muted mb-1">{provider.serviceType}</p>
              <p className="text-secondary small">Experienced professional providing support in {provider.serviceType}. Contact for assistance.</p>
            </div>
            <button className="btn btn-primary" onClick={() => handleProviderClick(provider.id || provider._id)}>
              View Details
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center"style={{height:"320px"}} >No providers available for this service.</p>
    )}
  </div>
</div> 
<Footer/> 
</>);
};

export default Providers;
