import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserMd, FaBalanceScale, FaHeadset, FaShieldAlt, FaQuoteLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const services = [
    { icon: <FaUserMd size={50} />, title: "Doctors", text: "Get medical help from trusted professionals." },
    { icon: <FaShieldAlt size={50} />, title: "Police", text: "Report incidents and get legal assistance." },
    { icon: <FaBalanceScale size={50} />, title: "Lawyers", text: "Get legal advice and support for your case." },
    { icon: <FaHeadset size={50} />, title: "Mental Health", text: "Speak to therapists for emotional support." },
  ];

  const testimonials = [
    { text: "HealHub connected me with a lawyer when I needed help the most. I felt safe and heard.", author: "Survivor from New Delhi" },
    { text: "Talking to a therapist here helped me regain confidence after a traumatic incident.", author: "Anonymous User" },
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="container text-center mt-5">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="fw-bold display-4">
          You Are Not Alone.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="lead text-muted">
          HealHub connects you with professionals who provide guidance, support, and assistance in times of crisis.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mt-4">
          <button className="btn btn-primary btn-lg mx-2" onClick={() => navigate("/services")}>
            Get Support
          </button>
          <button className="btn btn-outline-primary btn-lg mx-2" onClick={() => navigate("/messages")}>
            Message a Helper
          </button>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4">Our Services</h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-3 d-flex" key={index}>
              <motion.div whileHover={{ scale: 1.05 }} className="card text-center shadow-sm p-4 w-100">
                <div className="text-primary mb-3">{service.icon}</div>
                <h5 className="fw-bold">{service.title}</h5>
                <p className="text-muted">{service.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4">What People Say</h2>
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div className="col-md-6 d-flex" key={index}>
              <motion.div whileHover={{ scale: 1.05 }} className="card shadow-sm p-4 w-100">
                <FaQuoteLeft className="text-primary" size={30} />
                <p className="fst-italic mt-3">"{testimonial.text}"</p>
                <footer className="blockquote-footer">{testimonial.author}</footer>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container text-center mt-5 mb-5">
        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="fw-bold">
          Need Help? Start Now.
        </motion.h3>
        <p>Connect with our verified professionals today.</p>
        <motion.button whileHover={{ scale: 1.1 }} className="btn btn-success btn-lg" onClick={() => navigate("/services")}>
          Find Help
        </motion.button>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
