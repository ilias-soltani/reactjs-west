import React from "react";
import OTPForm from "../components/OTPForm/OTPForm";

const VerifyCodePage = () => {
  return (
    <div className="app-section">
      <div className="app-container">
        <OTPForm storage={"passwordCode"} />
      </div>
    </div>
  );
};

export default VerifyCodePage;
