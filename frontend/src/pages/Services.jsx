import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserMd, FaBrain, FaBalanceScale, FaShieldAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Services = () => {
  const navigate = useNavigate();

  // Default services with icons
  const services = [
    { icon: <FaUserMd size={50} />, title: "MediCare", text: "Medical support from trusted professionals." },
    { icon: <FaBrain size={50} />, title: "MindCare", text: "Emotional and psychological assistance." },
    { icon: <FaBalanceScale size={50} />, title: "LawHelp", text: "Legal advice and justice support." },
    { icon: <FaShieldAlt size={50} />, title: "SafeGuard", text: "Security and law enforcement guidance." }
  ];
  // Function to navigate to the providers list
  const handleServiceClick = (service) => {
    navigate(`/providers?service=${service}`);
  };

  return (
    <>
      <Navbar/>
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Our Services</h2>
      <div className="row g-4">
        {services.map((service, index) => (
          <div key={index} className="col-md-6 d-flex">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card text-center shadow-sm p-4 w-100"
              onClick={() => handleServiceClick(service.title)}
              style={{ cursor: "pointer" }}
            >
              <div className="text-primary mb-3">{service.icon}</div>
              <h5 className="fw-bold">{service.title}</h5>
              <p className="text-muted">{service.text}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Services;
