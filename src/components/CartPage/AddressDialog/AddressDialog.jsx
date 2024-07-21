import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { HiOutlineXMark } from "react-icons/hi2";
import { useGetAllUserAddressesQuery } from "../../../app/services/addressApi";
import { BeatLoader } from "react-spinners";
import LoadingButton from "../../LoadingButton/LoadingButton";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useCheckoutSessionMutation } from "../../../app/services/orderApi";

import "./AddressDialog.scss";

const AddressDialog = ({ setOpen, open }) => {
  const navigate = useNavigate();

  const [
    checkoutSession,
    {
      isError: checkoutIsError,
      isLoading: checkoutLoading,
      error: checkoutError,
      isSuccess,
      data: checkoutData,
    },
  ] = useCheckoutSessionMutation();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const { data, isLoading, isFetching } = useGetAllUserAddressesQuery();

  const checkout = async () => {
    await checkoutSession({
      shippingAddress: {
        alias: selectedAddress.alias,
        phone: selectedAddress.phone,
        country: selectedAddress.country,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode,
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const addressId = event.target.value;
    const address = data.data.find((address) => address._id === addressId);
    setSelectedAddress(address);
  };

  useEffect(() => {
    if (data?.count > 0) setSelectedAddress(data.data[0]);
  }, [data]);

  useEffect(() => {
    if (isSuccess) window.location.href = checkoutData?.session?.url;
  }, [isSuccess, checkoutData]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          console.log(selectedAddress);
          handleClose();
        },
      }}
    >
      <DialogTitle className="dialog-title">
        <span>Choose address</span>
        <div className="icon" onClick={handleClose}>
          <HiOutlineXMark />
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="dialog-p">
          Select a complete shipping address to view available shipping methods
        </DialogContentText>
        {isLoading || isFetching ? (
          <div className="flex-center" style={{ minHeight: "50px" }}>
            <BeatLoader color="#000" size={10} />
          </div>
        ) : data.count > 0 ? (
          <FormControl className="radio-form">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedAddress?._id || ""}
              onChange={handleChange}
            >
              {data.data.map((address, i) => (
                <div key={address._id + i} className="radio-address">
                  <FormControlLabel
                    value={address._id}
                    control={<Radio size="small" />}
                    label={address.alias}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "13px",
                      },
                    }}
                  />
                  <span className="address-details">
                    {address.city}, {address.country}, {address.postalCode},{" "}
                    {address.phone}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        ) : (
          <div className="flex-center" style={{ minHeight: "50px" }}>
            <h6 style={{ marginBottom: "0" }}>You have no address</h6>
          </div>
        )}
      </DialogContent>
      <DialogActions className="btns-cont">
        <button
          className="main-btn btn-add-address"
          onClick={() => {
            navigate("/profile/address/add-address", {
              state: { from: "/cart" },
            });
          }}
        >
          Add address
        </button>
        <LoadingButton
          color={"#fff"}
          size={8}
          styleClass={"pay-btn"}
          isLoading={checkoutLoading}
          title={"Checkout"}
          handelClick={checkout}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;
