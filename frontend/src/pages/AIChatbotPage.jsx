import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AIChatbot = () => {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
         <svg
  width="100"
  height="100"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="text-primary"
>
  <path
    d="M12 2C6.48 2 2 6.48 2 12c0 4.71 3.24 8.64 7.58 9.72v2.02c0 .55.45 1 1 1h2.84c.55 0 1-.45 1-1v-2.02C18.76 20.64 22 16.71 22 12c0-5.52-4.48-10-10-10Zm1 17h-2v-2h2v2Zm1.07-7.25-.9.92c-.72.74-1.17 1.4-1.17 2.83h-2v-.5c0-1.41.45-2.08 1.17-2.83l1.24-1.26c.47-.47.76-1.11.76-1.83 0-1.66-1.34-3-3-3s-3 1.34-3 3H6c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.04-.43 1.99-1.13 2.75Z"
    fill="currentColor"
  />
</svg>
          <h2 className="fw-bold">AI Chatbot</h2>
          <p className="text-muted">Coming Soon! Stay tuned for an interactive AI-powered assistant.</p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AIChatbot;