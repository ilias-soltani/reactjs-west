import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MainInput from "../components/Inputs/MainInput";
import LoadingButton from "../components/LoadingButton/LoadingButton";
import { useAddAddressMutation } from "../app/services/addressApi";
import { useNavigate, useLocation } from "react-router-dom";

const AddAddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [countries, setCountries] = useState([]);
  const [inputErr, setInputErr] = useState({ isError: false, helper: "" });

  const [addAddress, { isError, isLoading, error }] = useAddAddressMutation();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const phone = formData.get("phone");

    if (phone.length < 10)
      return setInputErr({
        isError: true,
        helper: "Please enter a valid phone number",
      });

    setInputErr({});

    await addAddress({
      alias: formData.get("alias"),
      phone,
      country: formData.get("country"),
      city: formData.get("city"),
      postalCode: formData.get("code"),
    });

    // Check the previous path and navigate accordingly
    if (location.state?.from === "/cart") {
      navigate("/cart");
    } else {
      navigate("/profile/address");
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const filteredCountries = data
          .map((country) => country.name.common)
          .filter((country) => country !== "Israel")
          .sort((a, b) => a.localeCompare(b));
        setCountries(filteredCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // useEffect(() => {
  //   if (isError) console.log(error);
  // }, [isError, error]);

  return (
    <div className="app-section">
      <div className="app-container">
        <h1 className="section-title">Add Address</h1>
        <form className="add-address-form" onSubmit={handelSubmit}>
          <Autocomplete
            disablePortal
            required
            id="combo-box-demo"
            options={countries}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} required name="country" label="Country" />
            )}
          />
          <MainInput
            required
            fullWidth
            id="alias"
            label="Home, Work, ..."
            name="alias"
            autoComplete="alias"
            focusColor="black"
            type="text"
          />
          <div className="line-inputs">
            <MainInput
              required
              fullWidth
              id="code"
              label="Postal Code"
              name="code"
              autoComplete="code"
              focusColor="black"
              type="text"
            />
            <MainInput
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              focusColor="black"
              type="text"
            />
          </div>

          <MainInput
            error={inputErr.isError}
            helperText={inputErr.helper}
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            focusColor="black"
            type="number"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10);
            }}
          />

          <LoadingButton
            styleClass={"create-address-btn"}
            color={"#000"}
            title={"Add address"}
            size={10}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default AddAddressPage;
