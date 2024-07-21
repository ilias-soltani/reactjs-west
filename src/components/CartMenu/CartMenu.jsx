import React, { useState, useEffect } from "react";
import HiddenNavBar from "../NavBar/components/HiddenNavBar/HiddenNavBar";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { setCartMenu } from "../../app/services/cartMenuSlice";
import { useDispatch } from "react-redux";
import { useGetUserCartQuery } from "../../app/services/cartApi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { SyncLoader } from "react-spinners";
import CartMenuItems from "./components/CartMenuItems";
import CartMenuInfo from "./components/CartMenuInfo";

import "./CartMenu.scss";

const CartMenu = () => {
  const { data, isLoading, isFetching, isError, error } = useGetUserCartQuery();

  const dispatch = useDispatch();

  const handleExit = () => {
    document.body.classList.remove("modal-open");
    setShow(false);
  };

  const setShow = (value) => {
    dispatch(setCartMenu(value));
  };

  if (isLoading) {
    return (
      <HiddenNavBar setShow={setShow} position={"left"} largeWidth={true}>
        <div className="flex-center" style={{ height: "100%" }}>
          <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
        </div>
      </HiddenNavBar>
    );
  }

  if (error && error?.status === 404) {
    return (
      <HiddenNavBar setShow={setShow} position={"left"} largeWidth={true}>
        <div className="cart-page-not-found-small">
          <div>
            <div className="icon">
              <HiOutlineShoppingBag />
            </div>
            <h2>Your cart is empty</h2>
            <button className="main-btn not-found-btn" onClick={handleExit}>
              Continue shopping
            </button>
          </div>
        </div>
      </HiddenNavBar>
    );
  }

  return (
    <HiddenNavBar setShow={setShow} position={"left"} largeWidth={true}>
      <div className="cart-menu">
        <CartMenuItems data={data?.data.cartItems} handleExit={handleExit} />
        <CartMenuInfo data={data?.data} handleExit={handleExit} />
      </div>
    </HiddenNavBar>
  );
};

export default CartMenu;
