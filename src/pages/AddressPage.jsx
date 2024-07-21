import React from "react";
import AddressesList from "../components/ProfilePage/AddressesList/AddressesList";
import { useGetAllUserAddressesQuery } from "../app/services/addressApi";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetAllUserAddressesQuery();
  return (
    <div className="profile-section">
      <h1 className="section-title">Addresses</h1>
      {isLoading || isFetching ? (
        <div className="flex-center" style={{ minHeight: "50px" }}>
          <BeatLoader color="#000" size={10} />
        </div>
      ) : data.count > 0 ? (
        <AddressesList data={data?.data} />
      ) : (
        <div className="flex-center" style={{ minHeight: "50px" }}>
          <h6 style={{ marginBottom: "0" }}>You have no address</h6>
        </div>
      )}

      <div className="flex-center">
        <button
          className="main-btn add-address-btn"
          onClick={() => navigate("/profile/address/add-address")}
        >
          Add address
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
