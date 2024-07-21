import React from "react";

import "./AddressesList.scss";
import { useDeleteAddressMutation } from "../../../app/services/addressApi";

const AddressesList = ({ data }) => {
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  const handelDelete = async (item) => {
    if (!isLoading) await deleteAddress(item._id);
  };
  return (
    <div
      className="addresses-list"
      style={{ opacity: isLoading ? "0.5" : "1" }}
    >
      {data.map((item, i) => (
        <div className="address-item" key={item._id + i}>
          <h6>{item.alias}</h6>
          <div className="location">
            {item.city}, {item.country}
          </div>
          <span className="code">{item.postalCode}</span>
          <span className="phone">{item.phone}</span>
          <div className="actions">
            <span>Edit</span>
            <span onClick={() => handelDelete(item)}>Delete</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressesList;
