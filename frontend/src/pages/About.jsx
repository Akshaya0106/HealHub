import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeartbeat, FaShieldAlt, FaGavel, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { FaUserMd, FaBalanceScale, FaHeadset, FaQuoteLeft } from "react-icons/fa";

import Navbar from "../components/Navbar";
const AboutUs = () => {
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
    <>
    <Navbar/>
    <div className="container py-5">
      <motion.h2
        className="text-center fw-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About HealHub
      </motion.h2>
      <motion.p
        className="text-center text-muted mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        HealHub is a platform dedicated to providing immediate and essential
        post-incident assistance to individuals in need. We connect victims
        with trusted professionals across healthcare, legal, law enforcement,
        and mental health services to ensure timely and effective support.
      </motion.p>
      
      <div className="row g-4">
        <motion.div
          className="col-md-6 col-lg-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card shadow p-4 text-center border-0">
            <FaHeartbeat size={50} className="text-danger mb-3" />
            <h5 className="fw-bold">MediCare</h5>
            <p className="text-muted">Immediate medical support from certified professionals.</p>
          </div>
        </motion.div>

        <motion.div
          className="col-md-6 col-lg-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card shadow p-4 text-center border-0">
            <FaBrain size={50} className="text-primary mb-3" />
            <h5 className="fw-bold">MindCare</h5>
            <p className="text-muted">Expert counseling for emotional and psychological well-being.</p>
          </div>
        </motion.div>

        <motion.div
          className="col-md-6 col-lg-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card shadow p-4 text-center border-0">
            <FaGavel size={50} className="text-warning mb-3" />
            <h5 className="fw-bold">LawHelp</h5>
            <p className="text-muted">Legal guidance and support for justice and protection.</p>
          </div>
        </motion.div>

        <motion.div
          className="col-md-6 col-lg-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card shadow p-4 text-center border-0">
            <FaShieldAlt size={50} className="text-success mb-3" />
            <h5 className="fw-bold">SafeGuard</h5>
            <p className="text-muted">Law enforcement and safety assistance when needed most.</p>
          </div>
        </motion.div>
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
    </>
  );
};

export default AboutUs;
