import React from "react";

const About = () => {
  return (
    <div className="pt-4">
      <div className="header pt-md-1">
        {/* Title Section */}
        <div className="head d-flex flex-column mt-4 justify-content-center align-items-center gap-1">
          <h2 className="text-center fw-bold">About Us</h2>
          <p className="text-muted text-center">Discover Tourist Buses with Ease</p>
        </div>
      </div>

      <div className="others box-shadow bg-white py-md-5 py-3 px-2 px-md-5">
        <section>
          <h4 className="fw-bold">1. Our Story</h4>
          <p>
            <strong>Tourist Bus</strong> was created to make it easier for travelers to find reliable tourist buses in Tamil Nadu.  
            We noticed that many buses were not listed online, making it difficult for tourists to discover their options.  
            Our goal is to bridge this gap by providing a simple and transparent bus listing platform.
          </p>
        </section>

        <section>
          <h4 className="fw-bold">2. Our Mission</h4>
          <p>
            Our mission is to connect travelers with the best tourist buses in their region.  
            By listing verified bus operators, we aim to ensure safe, comfortable, and well-reviewed travel experiences.
          </p>
        </section>

        <section>
          <h4 className="fw-bold">3. Why Choose Us?</h4>
          <ul>
            <li>🚌 Find Buses Easily – Discover tourist buses across Tamil Nadu.</li>
            <li>💯 Reliable Listings – Only trusted and verified operators.</li>
            <li>⭐ Real Reviews – Get insights from other travelers.</li>
            <li>📍 Location-Based Search – Find buses near your area.</li>
          </ul>
        </section>

        <section>
          <h4 className="fw-bold">4. What We Offer</h4>
          <ul>
            <li>🚍 Tourist Bus Listings – View detailed bus profiles with services, images, and contact details.</li>
            <li>📍 Location-Based Search – Find buses in your area easily.</li>
            <li>🚐 List Your Bus – Bus operators can register and showcase their services.</li>
            <li>🔎 Compare Options – Choose the best bus based on features and reviews.</li>
          </ul>
        </section>

        <section>
          <h4 className="fw-bold">5. Who We Are</h4>
          <p>
            We are a team passionate about simplifying travel information.  
            Our platform is designed to help tourists and local travelers find the best buses without hassle.
          </p>
        </section>

        <section>
          <h4 className="fw-bold">6. Contact Us</h4>
          <p>Have questions? Want to list your bus? Reach out!</p>
          <p>
            <a href="mailto:gowthamkvdl@gmail.com" className="text-primary fw-bold">
              gowthamkvdl@gmail.com
            </a>
          </p>
          <p>
            <strong>54 C/1, OPR Plot, Panruti Main Road, Vadalur, Cuddalore, Tamil Nadu, India</strong>
          </p>
        </section>

        <hr />
        <p className="text-muted text-center">
          We make finding buses simple. No bookings, just listings! 🚍
        </p>
      </div>
    </div>
  );
};

export default About;
