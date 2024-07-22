import React, { useState, useEffect } from "react";
import LoadingButton from "../../LoadingButton/LoadingButton";
import MainInput from "../../Inputs/MainInput";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../app/services/authApi";
import { setItemWithExpiry } from "../../../utils/setItemWithExpiry";

import "./ForgotPasswordForm.scss";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [inputErr, setInputErr] = useState({ isError: false, helper: "" });
  const [email, setEmail] = useState("");

  const [forgotPassword, { data, isError, isLoading, isSuccess, error }] =
    useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    setInputErr({});

    setEmail(email);

    await forgotPassword({ email });
  };

  useEffect(() => {
    if (isSuccess) {
      setItemWithExpiry("passwordCode", email);
      navigate("/verify-code");
    }
    if (isError) {
      // console.log(error);
      setInputErr({
        isError: true,
        helper:
          "Email address not found. Please check your email and try again.",
      });
    }
  }, [isSuccess, isError, error, data]);

  return (
    <div className="forgot-password-form">
      <div>
        <h5>Forgot password</h5>
        <form className="forgot-password-inputs" onSubmit={handleSubmit}>
          <MainInput
            error={inputErr.isError}
            helperText={inputErr.helper}
            required
            name="email"
            label="Entre email"
            type="email"
            id="email"
            autoComplete="email"
            focusColor="black"
          />
          <LoadingButton
            color={"#000"}
            title={"Next"}
            isLoading={isLoading}
            size={10}
            styleClass={"next-btn"}
          />
        </form>
        <p>
          We’ll send a <span>verification code</span> to this <span>email</span>{" "}
          if it matches an existing West account.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
