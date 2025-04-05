import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {
  useEffect(() => {
    // Load Google Translate script dynamically
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    // Define Google Translate function globally
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ta,te,kn,ml,hi", // Tamil, Telugu, Kannada, Malayalam, Hindi
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  const {currentUser} = useContext(AuthContext)

  return (
    <footer className="bg-white text-dark py-4">
      <hr />
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">Tourist Bus</h5>
            <p className="text-muted">
              Your trusted platform for finding the best tourist buses in Tamil
              Nadu.
            </p>
            { !currentUser && <div id="lang" className="mt-3">
              <h5 className="fw-bold">Select Language</h5>
              <div id="google_translate_element"></div>
            </div>}
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/profile" className="text-dark text-decoration-none">
                  Profile
                </a>
              </li>
              <li>
                <a href="/fav" className="text-dark text-decoration-none">
                  Favorites
                </a>
              </li>
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
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">Our Services</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/list?limit=5"
                  className="text-dark text-decoration-none"
                >
                  View Buses
                </a>
              </li>
              <li>
                <a href="/add" className="text-dark text-decoration-none">
                  List Your Bus
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Language Selector */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="mb-1">
              54 C/1, OPR Plot, Panruti Main Road, Vadalur, Cuddalore, Tamil
              Nadu, India
            </p>
            <p className="mb-1">
              <a
                href="tel:+917010399378"
                className="text-dark text-decoration-none"
              >
                +91 7010399378
              </a>
            </p>
            <p className="mb-1">
              <a
                href="mailto:gowthamkvdl@gmail.com"
                className="text-dark text-decoration-none"
              >
                gowthamkvdl@gmail.com
              </a>
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
