import React from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../components/backBtn/BackBtn";

const Submit = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="py-3 py-md-2"></div>
      <BackBtn />
      <div className="py-3"></div>
      <div className="header pt-md-2">
        <div className="others box-shadow p-4 bg-white mt-4 pb-5 text-center rounded">
          <h4 className="text-success mb-3">🎉 Bus Submitted for Verification</h4>
          <p className="text-muted">
            Your images and details have been successfully uploaded and your bus is now under review.
            Our team will verify the content shortly. You’ll be notified once the verification is complete.
          </p>
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/profile")}
            >
              Go to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
