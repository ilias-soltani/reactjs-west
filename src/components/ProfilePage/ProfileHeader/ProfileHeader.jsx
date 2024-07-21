import React, { useEffect } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProfileHeader.scss";
import { resetApp } from "../../../app/actions";
import { useDispatch } from "react-redux";

const ProfileHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("/profile");

  useEffect(() => {
    if (location.pathname === "/profile") {
      setValue("/profile");
    } else if (location.pathname === "/profile/address") {
      setValue("/profile/address");
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Reset the application state
    dispatch(resetApp());

    // Redirect to the home page
    navigate("/", { replace: true });
  };

  return (
    <div className="profile-header">
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#545353",
          },
        }}
      >
        <Tab label="Orders" value="/profile" className="app-tab" />
        <Tab label="Address" value="/profile/address" className="app-tab" />
      </Tabs>
      <span className="logout" onClick={logout}>
        Logout
      </span>
    </div>
  );
};

export default ProfileHeader;
