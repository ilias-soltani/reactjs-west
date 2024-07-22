import React, { useState, useEffect, useRef } from "react";
import CopyText from "../../CopyText/CopyText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import amazon from "../../../assets/svgs/amazon.svg";
import exp from "../../../assets/svgs/american-express.svg";
import bitcion from "../../../assets/svgs/bitcoin-1.svg";
import cb from "../../../assets/svgs/cb.svg";
import disc from "../../../assets/svgs/discover.svg";
import kal from "../../../assets/svgs/klarna-1.svg";
import mea from "../../../assets/svgs/maestro.svg";
import mas from "../../../assets/svgs/mastercard.svg";
import pay from "../../../assets/svgs/paypal.svg";
import visa from "../../../assets/svgs/visa.svg";
import wes from "../../../assets/svgs/western-union.svg";
import LoadingButton from "../../LoadingButton/LoadingButton";
import { useApplyCouponMutation } from "../../../app/services/cartApi";

import AddressDialog from "../AddressDialog/AddressDialog";

import "./CartInfo.scss";

const CartInfo = ({ data }) => {
  const [
    applyCoupon,
    { isError: couponIsError, isLoading: couponLoading, error: couponError },
  ] = useApplyCouponMutation();

  const [openDialog, setOpenDialog] = useState(false);

  const appIsLoading = couponLoading;
  const appIsError = couponIsError;
  const appError = couponError;

  const [coupon, setCoupon] = useState("");
  const [couponMassege, setCouponMassege] = useState(
    data.discount ? `Coupon applied for ${data.discount}% off!` : ""
  );

  const handleCouponChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (value.length > 12) value = value.slice(0, 12);

    let formattedValue =
      value
        .match(/.{1,4}/g)
        ?.join("-")
        .slice(0, 14) || "";

    if (value.length > 0 && value.length % 4 === 0 && value.length < 12) {
      formattedValue += "-";
    }

    setCoupon(formattedValue);
  };

  const handleKeyDown = (e) => {
    const cursorPosition = e.target.selectionStart;
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      coupon[cursorPosition - 1] === "-"
    ) {
      e.preventDefault();
      setCoupon(
        coupon.slice(0, cursorPosition - 1) + coupon.slice(cursorPosition)
      );
      e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }
  };

  const handelCouponSubmit = async (e) => {
    e.preventDefault();

    if (coupon) {
      const couponData = await applyCoupon(coupon);
      if (couponData?.error?.data?.error)
        setCouponMassege(couponData?.error?.data?.error);

      setCoupon("");
    }
  };

  // useEffect(() => {
  //   if (appIsError) {
  //     console.log(appError);
  //   }
  // }, [appIsError, appError]);

  useEffect(() => {
    setCouponMassege(
      data.discount ? `Coupon applied for ${data.discount}% off!` : ""
    );
  }, [data]);

  return (
    <div className="cart-info">
      <div className="cart-content">
        <div className="subtotal-header">
          <span>Subtotal</span>
          <span className={`subtotal ${data.discount ? "discount" : ""}`}>
            <span className="main"> ${data.totalPrice.toFixed(2)}</span>
            {data.discount && (
              <span className="sec">
                ${data.totalPriceAfterDiscount.toFixed(2)}
              </span>
            )}
          </span>
        </div>
        <div className="total-header">
          <span>Total</span>
          <span className="total">
            $
            {((data.totalPriceAfterDiscount || data.totalPrice) + 15).toFixed(
              2
            )}{" "}
            USD
          </span>
        </div>
        <p className="p-info">
          Tax included and shipping calculated at checkout
        </p>
        <form className="copun-form" onSubmit={handelCouponSubmit}>
          <input
            type="text"
            placeholder="Discount code or gift card"
            value={coupon}
            onChange={handleCouponChange}
            onKeyDown={handleKeyDown}
            disabled={data.discount}
          />
          <LoadingButton
            isLoading={couponLoading}
            size={8}
            color={"#000"}
            title={"Apply"}
            styleClass={"apply-copun"}
          />
          {couponMassege && (
            <span className={`${data.discount ? "span-green" : "span-error"}`}>
              {couponMassege}
            </span>
          )}
        </form>
        <Alert severity="info" style={{ textAlign: "start" }}>
          <AlertTitle style={{ fontWeight: "bolder", fontSize: "13px" }}>
            Demo code!
          </AlertTitle>
          <span
            style={{
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            coupon: Q789-4TPQ-M29T
            <CopyText text={"Q789-4TPQ-M29T"} />
          </span>
        </Alert>
        <LoadingButton
          isLoading={false}
          size={10}
          color={"#000"}
          title={"Checkout"}
          styleClass={"btn-checkout"}
          handelClick={() => setOpenDialog(true)}
        />
      </div>
      <div className="payment-info">
        We accept
        <div className="payments">
          {[amazon, exp, bitcion, cb, disc, kal, mea, mas, pay, visa, wes].map(
            (item, i) => (
              <img src={item} alt={i} key={i} />
            )
          )}
        </div>
      </div>
      <AddressDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default CartInfo;
