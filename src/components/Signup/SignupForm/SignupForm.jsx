import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainInput from "../../Inputs/MainInput";
import LoadingButton from "../../LoadingButton/LoadingButton";
import { useSignupMutation } from "../../../app/services/authApi";
import { useNavigate } from "react-router-dom";
import { setItemWithExpiry } from "../../../utils/setItemWithExpiry";

import "./SignupForm.scss";

const SignupForm = () => {
  const navigate = useNavigate();

  const [signup, { data, isError, isLoading, isSuccess, error }] =
    useSignupMutation();

  const [emailError, setEmailError] = useState({ herlper: "", isError: false });
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState({
    herlper: "",
    isError: false,
  });
  const [confPasswordError, setConfPasswordError] = useState({
    herlper: "",
    isError: false,
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confrimPassword = formData.get("confirm-password");
    const fullName = `${formData.get("first-name")} ${formData.get(
      "last-name"
    )}`;

    setEmailError({});

    if (password.length < 8)
      return setPasswordError({
        isError: true,
        herlper: "Password should be at least 8 characters",
      });

    setPasswordError({});

    if (password !== confrimPassword)
      return setConfPasswordError({
        herlper: "Passwords must match!",
        isError: true,
      });

    setConfPasswordError({});

    setEmail(email);

    await signup({
      name: fullName,
      email,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      setItemWithExpiry("emailCode", email);
      navigate("/verify-email");
    }

    if (isError) {
      console.log("error", error);
      setEmailError({ isError: true, herlper: "Email already in use!" });
    }
  }, [data, isError, isSuccess]);

  return (
    <div className="signup-form">
      <div className="app-container signup-container">
        <div className="text">
          <h1>Sign up</h1>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </div>
        <form className="form-signup" onSubmit={handelSubmit}>
          <div className="name-inputs">
            <MainInput
              required
              fullWidth
              id="first-name"
              label="First Name"
              name="first-name"
              autoComplete="first-name"
              focusColor="black"
            />

            <MainInput
              required
              fullWidth
              id="last-name"
              label="Last Name"
              name="last-name"
              autoComplete="last-name"
              focusColor="black"
            />
          </div>
          <MainInput
            error={emailError.isError}
            helperText={emailError.herlper}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            focusColor="black"
            type="email"
          />
          <MainInput
            error={passwordError.isError}
            helperText={passwordError.herlper}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            focusColor="black"
          />
          <MainInput
            error={confPasswordError.isError}
            helperText={confPasswordError.herlper}
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            focusColor="black"
          />
          <LoadingButton
            size={10}
            color={"#fff"}
            styleClass={"btn-signup"}
            isLoading={isLoading}
            title={"Create account"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
