import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileHeader from "../components/ProfilePage/ProfileHeader/ProfileHeader";
import AddressPage from "./AddressPage";
import OrdersPage from "./OrdersPage";
import NotFoundPage from "./NotFoundPage";

const ProfilePage = () => {
  return (
    <div className="app-section-profile">
      <ProfileHeader />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="address" element={<AddressPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage;
