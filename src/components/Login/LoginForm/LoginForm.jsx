import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CopyText from "../../CopyText/CopyText";
import MainInput from "../../Inputs/MainInput";
import { useLoginMutation } from "../../../app/services/authApi";
import LoadingButton from "../../LoadingButton/LoadingButton";
import { setItemWithExpiry } from "../../../utils/setItemWithExpiry";

import "./LoginForm.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState({ herlper: "", isError: false });
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState({
    herlper: "",
    isError: false,
  });

  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginMutation();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (password.length < 8)
      return setPasswordError({
        isError: true,
        herlper: "Password should be at least 8 characters",
      });

    setPasswordError({});

    setEmail(email);

    await login({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.status?.startsWith("Code has been sent")) {
        setItemWithExpiry("emailCode", email);
        navigate("/verify-email");
      } else {
        localStorage.setItem("token", data?.token);
        localStorage.removeItem("emailCode");
        navigate("/", { replace: true });
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error?.status === 401) {
        setEmailError({
          isError: true,
          herlper: error?.data.error,
        });
      }
    }
  }, [isError, error]);

  return (
    <div className="login-form">
      <div className="app-container login-container">
        <div className="text">
          <h1>Login</h1>
          <span>
            Not a Not a member yet? <Link to={"/register"}>Sign up</Link>
          </span>
        </div>
        <form className="form-login" onSubmit={handelSubmit}>
          <Alert severity="info" style={{ textAlign: "start" }}>
            <AlertTitle style={{ fontWeight: "bolder" }}>
              Demo Account!
            </AlertTitle>
            <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              Email:
              <span style={{ fontWeight: "bold" }}> user@west.com</span>
              <CopyText text={"xm7z1234@gmail.com"} />
            </span>
            <span
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              Passowrd:
              <span style={{ fontWeight: "bold" }}> 12345678</span>
              <CopyText text={"12345678"} />
            </span>
          </Alert>
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
          <Link to="/forgot-password" className="forgot-pass">
            Forgot Password?
          </Link>
          <LoadingButton
            size={10}
            color={"#fff"}
            styleClass={"btn-login"}
            isLoading={isLoading}
            title={"Login"}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
