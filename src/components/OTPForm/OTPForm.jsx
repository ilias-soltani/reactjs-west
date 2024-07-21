import React, { useState, useEffect } from "react";
import MainInput from "../Inputs/MainInput";
import { obfuscateEmail } from "../../utils/obfuscateEmail";
import {
  getItemWithExpiry,
  setItemWithExpiry,
} from "../../utils/setItemWithExpiry";
import LoadingButton from "../LoadingButton/LoadingButton";
import "./OTPForm.scss";
import { useVerifyEmailMutation } from "../../app/services/authApi";
import { useVerifyPasswordCodeMutation } from "../../app/services/authApi";
import { useNavigate } from "react-router-dom";

const OTPForm = ({ storage }) => {
  const navigate = useNavigate();
  const [inputErr, setInputErr] = useState({ isError: false, helper: "" });
  const email = getItemWithExpiry(storage);

  const [
    verifyEmail,
    {
      data: emailData,
      isError: emailIsError,
      isLoading: emailLoading,
      isSuccess: emailIsSuccess,
      error: emailError,
    },
  ] = useVerifyEmailMutation();

  const [
    verifyPasswordCode,
    {
      data: passwordData,
      isError: passwordIsError,
      isLoading: passwordLoading,
      isSuccess: passwordIsSuccess,
      error: passwordError,
    },
  ] = useVerifyPasswordCodeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code");

    if (code.length < 6)
      return setInputErr({
        isError: true,
        helper: "Code must be 6 digits.",
      });

    setInputErr({});

    if (!email) return null;

    if (storage === "emailCode")
      await verifyEmail({
        email,
        code,
      });
    else if (storage === "passwordCode")
      await verifyPasswordCode({
        email,
        code,
      });
  };

  useEffect(() => {
    if (emailIsSuccess) {
      localStorage.setItem("token", emailData?.token);
      localStorage.removeItem("emailCode");
      navigate("/", { replace: true });
    }
    if (emailIsError) {
      setInputErr({ isError: true, helper: "Code invalid or expired" });
    }
  }, [emailIsSuccess, emailIsError, emailError, emailData]);

  useEffect(() => {
    if (passwordIsSuccess) {
      setItemWithExpiry("isPasswordReset", email, 20 * 60 * 1000);
      localStorage.removeItem("passwordCode");
      navigate("/reset-password", { replace: true });
    }
    if (passwordIsError) {
      console.log(passwordError);
      setInputErr({ isError: true, helper: "Code invalid or expired" });
    }
  }, [passwordIsSuccess, passwordIsError, passwordError, passwordData]);

  return (
    <div className="otp-form">
      <div>
        <h5>Enter the 6-digit code</h5>
        <span>
          Check
          <span> {obfuscateEmail(email) || "your email"}</span> for a
          verification code.
        </span>
        <form className="otp" onSubmit={handleSubmit}>
          <MainInput
            error={inputErr.isError}
            helperText={inputErr.helper}
            required
            name="code"
            label="6-digit code"
            type="number"
            id="code"
            autoComplete="code"
            focusColor="black"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 6);
            }}
          />
          <LoadingButton
            color={"#000"}
            title={"Submit"}
            isLoading={emailLoading || passwordLoading}
            size={10}
            styleClass={"otp-btn"}
          />
        </form>
        <p>
          If you don’t see the email in your inbox, check your{" "}
          <span>spam folder.</span> If it’s not there, the email address may not
          be confirmed, or it may not match an existing West account.
        </p>
      </div>
    </div>
  );
};

export default OTPForm;
