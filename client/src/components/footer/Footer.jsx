import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-dark py-4">
        <hr /> 
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Tourist Bus</h5>
            <p className="text-muted">
              Your trusted platform for finding the best tourist buses in Tamil Nadu.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled ">
              <li>
                <a href="/about" className="text-dark text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/terms" className="text-dark text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-dark text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="text-dark text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="mb-1">
              54 C/1, OPR Plot, Panruti Main Road, Vadalur, Cuddalore, Tamil Nadu, India
            </p>
            <p className="mb-1">
              <a href="tel:+917010399378" className="text-dark text-decoration-none">+91 7010399378</a>
            </p>
            <p className="mb-1">
              <a href="mailto:gowthamkvdl@gmail.com" className="text-dark text-decoration-none">gowthamkvdl@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center border-top">
          <p className="mb-0 text-muted mt-3">
            &copy; {new Date().getFullYear()} Tourist Bus. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
