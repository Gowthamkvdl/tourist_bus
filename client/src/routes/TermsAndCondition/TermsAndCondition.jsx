import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="pt-3">
      <div className="header pt-md-1"> 
        {/* Header Section */}
        <div className="head d-flex flex-column mt-4 justify-content-center align-items-center gap-1">
          <h2 className="text-center fw-bold">Terms & Conditions</h2>
          <p className="text-muted text-center">Last Updated: February 2025</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="others box-shadow bg-white py-md-5 py-3 px-2 px-md-5">
        
        {/* Introduction */}
        <section>
          <h4 className="fw-bold">1. Introduction</h4>
          <p>
            Welcome to <strong>Tourist Bus</strong>. By accessing or using our platform, you agree 
            to these Terms & Conditions. Please read them carefully before proceeding.
          </p>
        </section>

        {/* Platform's Role */}
        <section>
          <h4 className="fw-bold">2. Our Role</h4>
          <p>
            We operate as an online platform that lists tourist buses across Tamil Nadu. We do not provide 
            transportation services but act as a directory connecting passengers with bus operators.
          </p>
        </section>

        {/* Information Accuracy */}
        <section>
          <h4 className="fw-bold">3. Information Accuracy</h4>
          <p>
            While we strive to provide accurate and up-to-date details about bus operators, we do not guarantee 
            their absolute accuracy. Any discrepancies should be addressed directly with the respective operator.
          </p>
        </section>

        {/* No Liability for Transactions */}
        <section>
          <h4 className="fw-bold">4. No Liability for Transactions</h4>
          <p>
            We do not handle bookings, payments, or cancellations. Any communication, negotiation, or 
            transaction is strictly between the passenger and the bus operator. We are not responsible for 
            disputes, service failures, or delays.
          </p>
        </section>

        {/* User Responsibility */}
        <section>
          <h4 className="fw-bold">5. User Responsibility</h4>
          <p>
            Users are responsible for verifying the credibility of bus operators before making any travel 
            decisions. We encourage users to contact operators directly for updated schedules and fares.
          </p>
        </section>

        {/* Privacy & Data Protection */}
        <section>
          <h4 className="fw-bold">6. Privacy & Data Protection</h4>
          <p>
            We value your privacy and take data protection seriously. Here’s how we handle your data:
          </p>
          <ul>
            <li>We collect only necessary data for providing our services.</li>
            <li>Personal data is never shared or sold to third parties.</li>
            <li>We use encryption to protect your data from unauthorized access.</li>
            <li>You can request data deletion by contacting us.</li>
          </ul>
        </section>

        {/* Acceptable Use Policy */}
        <section>
          <h4 className="fw-bold">7. Acceptable Use</h4>
          <p>
            Users must not misuse our platform for fraudulent activities, spam, or misinformation. Violation of this 
            policy may lead to account suspension or legal action.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h4 className="fw-bold">8. Contact Information</h4>
          <p>
            If you have questions, complaints, or need assistance, you can contact us at:
          </p>
          <p>
            Phone: +91 7010399378
          </p>
          <p>
            Email:{" "}
            <a href="mailto:gowthamkvdl@gmail.com" className="text-primary fw-bold">
              gowthamkvdl@gmail.com
            </a>
          </p>
          <p>
            Address: <strong>54 C/1, OPR Plot, Panruti Main Road,
            Vadalur, Cuddalore District, Tamil Nadu, India</strong>
          </p>
        </section>

        <hr />
        <p className="text-muted text-center">
          By using our platform, you acknowledge that you have read, understood, and agreed to these 
          Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
