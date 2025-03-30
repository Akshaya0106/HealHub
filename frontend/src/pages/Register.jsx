import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "victim",
    serviceType: "",
    details: {}
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExtraDetailsChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      details: {
        ...prevState.details,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password || (formData.role === "provider" && !formData.serviceType)) {
      setError("All required fields must be filled.");
      return;
    }
    console.log(formData)

    try {
      const res = await axios.post("http://localhost:5000/auth/register", formData);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Registration failed. Email might already be in use.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "450px" }}>
        <h3 className="text-center">Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
              <option value="victim">Victim</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>
          {formData.role === "provider" && (
            <div className="mb-3">
              <label className="form-label">Service Type</label>
              <select className="form-select" name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                <option value="">Select Service</option>
                <option value="MediCare">MediCare</option>
                <option value="MindCare">MindCare</option>
                <option value="LawHelp">LawHelp</option>
                <option value="SafeGuard">SafeGuard</option>
              </select>
            </div>
          )}
          {/* Conditional Extra Details */}
          {formData.role === "provider" && formData.serviceType && (
            <>
              {[
                "MediCare", "MindCare", "LawHelp", "SafeGuard"
              ].includes(formData.serviceType) && (
                <div className="mb-3">
                  <label className="form-label">Experience (Years)</label>
                  <input type="number" className="form-control" name="experience" onChange={handleExtraDetailsChange} required />
                </div>
              )}
              {formData.serviceType === "MediCare" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Medical License Number</label>
                    <input type="text" className="form-control" name="medicalLicenseNumber" onChange={handleExtraDetailsChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Hospital</label>
                    <input type="text" className="form-control" name="hospital" onChange={handleExtraDetailsChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Specialization</label>
                    <input type="text" className="form-control" name="specialization" onChange={handleExtraDetailsChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input type="text" className="form-control" name="contactNumber" onChange={handleExtraDetailsChange} required />
                  </div>
                </>
              )}
              {formData.serviceType === "MindCare" && (
                <>
                
                <div className="mb-3">
                  <label className="form-label">License Number</label>
                  <input type="text" className="form-control" name="licenseNumber" onChange={handleExtraDetailsChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Specialization</label>
                  <input type="text" className="form-control" name="specialization" onChange={handleExtraDetailsChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Clinic Name</label>
                  <input type="text" className="form-control" name="clinic" onChange={handleExtraDetailsChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact</label>
                  <input type="text" className="form-control" name="contactNumber" onChange={handleExtraDetailsChange} required />
                </div>
                
                </>
              )}
              {formData.serviceType === "SafeGuard" && (
                <>
                <div className="mb-3">
                  <label className="form-label">Badge Number</label>
                  <input type="text" className="form-control" name="badgeNumber" onChange={handleExtraDetailsChange} required />
                </div>
                <div className="mb-3">
                <label className="form-label">Station</label>
                <input type="text" className="form-control" name="station" onChange={handleExtraDetailsChange} required />
              </div>
                <div className="mb-3">
                <label className="form-label">Contact</label>
                <input type="text" className="form-control" name="contactNumber" onChange={handleExtraDetailsChange} required />
              </div>
              </>
              )}
              {formData.serviceType === "LawHelp" && (
                <>
                <div className="mb-3">
                  <label className="form-label">Bar License Number</label>
                  <input type="text" className="form-control" name="barLicenseNumber" onChange={handleExtraDetailsChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Specialization</label>
                  <input type="text" className="form-control" name="specialization" onChange={handleExtraDetailsChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact</label>
                  <input type="text" className="form-control" name="contactNumber" onChange={handleExtraDetailsChange} required />
                </div>
                
                </>
              )}
            </>
          )}
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
