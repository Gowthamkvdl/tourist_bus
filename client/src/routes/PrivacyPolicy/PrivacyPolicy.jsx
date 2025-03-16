import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="pt-3">
      <div className="header pt-md-1">
        {/* Title Section */}
        <div className="head d-flex flex-column mt-4 justify-content-center align-items-center gap-1">
          <h2 className="text-center fw-bold">Privacy Policy</h2>
          <p className="text-muted text-center">Last Updated: February 2025</p>
        </div>
      </div>

      <div className="others box-shadow bg-white py-md-5 py-3 px-2 px-md-5">
        <section>
          <h4 className="fw-bold">1. Introduction</h4>
          <p>
            Welcome to <strong>Tourist Bus</strong>. Your privacy is important to us. This policy explains how we collect, use, and protect your personal data when using our services.
          </p>
        </section>

        <section>
          <h4 className="fw-bold">2. Information We Collect</h4>
          <p>We collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, phone number, City</li>
            <li><strong>Usage Data:</strong> IP address, browser type, and pages visited.</li>
            <li><strong>Cookies:</strong> To enhance user experience and improve our services.</li>
          </ul>
        </section>

        <section>
          <h4 className="fw-bold">3. How We Use Your Information</h4>
          <p>We use the collected data to:</p>
          <ul>
            <li>Provide and improve our services.</li>
            <li>Respond to inquiries and provide support.</li>
            <li>Analyze website traffic and user interactions.</li>
          </ul>
        </section>

        <section>
          <h4 className="fw-bold">4. Data Protection & Security</h4>
          <p>
            We take reasonable security measures to protect your data from unauthorized access, modification, or loss. However, no online system is 100% secure.
          </p>
        </section>

        <section>
          <h4 className="fw-bold">5. Third-Party Services</h4>
          <p>
            We may use third-party tools for analytics, ads, or support. These services have their own privacy policies, and we recommend reviewing them.
          </p>
        </section>

        <section>
          <h4 className="fw-bold">6. Your Rights</h4>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request deletion of your data.</li>
          </ul>
        </section>

        <section>
          <h4 className="fw-bold">7. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, you can contact us at:
          </p>
          <p>
            <a href="mailto:gowthamkvdl@gmail.com" className="text-primary fw-bold">gowthamkvdl@gmail.com</a>
          </p>
          <p>
            <strong>54 C/1, OPR Plot, Panruti Main Road, Vadalur, Cuddalore, Tamil Nadu, India</strong>
          </p>
        </section>

        <hr />
        <p className="text-muted text-center">
          By using our services, you agree to this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
