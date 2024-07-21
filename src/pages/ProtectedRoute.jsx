import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItemWithExpiry } from "../utils/setItemWithExpiry";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (role === "user") {
    if (!token || token?.length < 10) {
      return <Navigate to="/login" replace={true} />;
    }
  }

  if (role === "code") {
    if (token && token?.length >= 10) {
      return <Navigate to="/" replace={true} />;
    }

    if (
      !getItemWithExpiry("emailCode") &&
      location.pathname === "/verify-email"
    ) {
      return <Navigate to="/" replace={true} />;
    }

    if (
      !getItemWithExpiry("passwordCode") &&
      location.pathname === "/verify-code"
    ) {
      return <Navigate to="/" replace={true} />;
    }

    if (
      !getItemWithExpiry("isPasswordReset") &&
      location.pathname === "/reset-password"
    ) {
      return <Navigate to="/" replace={true} />;
    }
  }

  if (role === "none") {
    if (token && token?.length >= 10) {
      return <Navigate to="/" replace={true} />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
