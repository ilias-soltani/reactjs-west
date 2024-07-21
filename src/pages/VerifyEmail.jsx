import React from "react";
import OTPForm from "../components/OTPForm/OTPForm";

const VerifyEmail = () => {
  return (
    <div className="app-section">
      <div className="app-container">
        <OTPForm storage={"emailCode"} />
      </div>
    </div>
  );
};

export default VerifyEmail;
