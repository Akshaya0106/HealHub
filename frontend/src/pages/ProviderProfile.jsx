import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const ProviderProfile = () => {
  const { id } = useParams(); // Extract provider ID from URL
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await axios.get(`https://healhub-5by5.onrender.com/providers/${id}`);
        console.log("Fetched Provider Data:", response.data);
        setProvider(response.data);
      } catch (err) {
        console.error("Error fetching provider:", err);
        setError("Failed to fetch provider details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProvider();
    }
  }, [id]);

  const handleMessage = () => {
    navigate(`/messages?receiver=${id}`);
  };

  if (loading) return <p className="text-center">Loading provider details...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-3">
          <FaUserCircle size={100} className="text-secondary" />
        </div>
        <h2 className="text-center mb-3">{provider?.name}'s Profile</h2>
        <hr />
        <p><strong>Email:</strong> {provider?.email}</p>
        <p><strong>Service Type:</strong> {provider?.serviceType}</p>

        {provider?.additionalDetails && (
          <>
            {provider.serviceType === "SafeGuard" && (
              <>
                <p><strong>Badge Number:</strong> {provider.additionalDetails.badgeNumber}</p>
                <p><strong>Station:</strong> {provider.additionalDetails.station}</p>
              </>
            )}
            {provider.serviceType === "LawHelp" && (
              <p><strong>Bar License Number:</strong> {provider.additionalDetails.barLicenseNumber}</p>
            )}
            {provider.serviceType === "MediCare" && (
              <p><strong>Medical License Number:</strong> {provider.additionalDetails.medicalLicenseNumber}</p>
            )}
            {provider.serviceType === "MindCare" && (
              <p><strong>License Number:</strong> {provider.additionalDetails.licenseNumber}</p>
            )}
            <p><strong>Experience:</strong> {provider.additionalDetails.experience} years</p>
          </>
        )}

        <button className="btn btn-primary w-100 mt-3" onClick={handleMessage}>
          Message {provider?.name}
        </button>
      </div>
    </div>
    <Footer/>
</>
  );
};

export default ProviderProfile;
