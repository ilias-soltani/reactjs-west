import React, { useState, useEffect } from "react";
import LoadingButton from "../../LoadingButton/LoadingButton";
import MainInput from "../../Inputs/MainInput";
import { getItemWithExpiry } from "../../../utils/setItemWithExpiry";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../../app/services/authApi";

import "./ResetPasswordForm.scss";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState({
    helper: "",
    isError: false,
  });
  const [confPasswordError, setConfPasswordError] = useState({
    helper: "",
    isError: false,
  });

  const email = getItemWithExpiry("isPasswordReset");

  const [resetPassword, { data, isError, isLoading, isSuccess, error }] =
    useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password.length < 8)
      return setPasswordError({
        isError: true,
        helper: "Password should be at least 8 characters",
      });

    setPasswordError({});

    if (password !== confirmPassword)
      return setConfPasswordError({
        helper: "Passwords must match!",
        isError: true,
      });

    setConfPasswordError({});

    await resetPassword({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("isPasswordReset");
      navigate("/login", { replace: true });
    }
    if (isError) {
      // console.log(error);
      setPasswordError({
        isError: true,
        helper: "Something went wrong, please try again later",
      });
    }
  }, [isSuccess, isError, error, data]);

  return (
    <div className="reset-password-form">
      <div>
        <h5>Reset password</h5>
        <form className="reset-password-inputs" onSubmit={handleSubmit}>
          <MainInput
            error={passwordError.isError}
            helperText={passwordError.helper}
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            focusColor="black"
          />
          <MainInput
            error={confPasswordError.isError}
            helperText={confPasswordError.helper}
            required
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            focusColor="black"
          />
          <LoadingButton
            color={"#000"}
            title={"Submit"}
            isLoading={isLoading}
            size={10}
            styleClass={"submit-btn"}
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
