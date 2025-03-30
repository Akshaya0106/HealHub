import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <h5 className="fw-bold">HealHub - You Are Not Alone</h5>
        <p className="text-muted">Providing support and assistance when you need it the most.</p>
        
        <div className="d-flex justify-content-center gap-4 mt-3">
          <Link to="/services" className="text-light text-decoration-none">Services</Link>
          <Link to="/about" className="text-light text-decoration-none">About Us</Link>
          <Link to="/contact" className="text-light text-decoration-none">Contact</Link>
          <Link to="/faq" className="text-light text-decoration-none">FAQ</Link>
        </div>
        
        <div className="mt-4">
          <p className="mb-0 small">&copy; {new Date().getFullYear()} HealHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;