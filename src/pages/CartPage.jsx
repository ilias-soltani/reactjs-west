import React, { useEffect } from "react";
import CartItems from "../components/CartPage/CartItems/CartItems";
import CartInfo from "../components/CartPage/CartInfo/CartInfo";
import { useGetUserCartQuery } from "../app/services/cartApi";
import { SyncLoader } from "react-spinners";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError, error } = useGetUserCartQuery();

  // useEffect(() => {
  //   console.log(data);
  //   console.log("error", error);
  // }, [isError, error, data]);

  if (isLoading) {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return (
      <div className="app-section prodcut-page-loading">
        <div className="app-container">
          <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
        </div>
      </div>
    );
  }

  if (error && error?.status === 404) {
    return (
      <div className="app-section cart-page-not-found">
        <div className="app-container">
          <div className="icon">
            <HiOutlineShoppingBag />
          </div>
          <h2>Your cart is empty</h2>
          <button
            className="main-btn not-found-btn"
            onClick={() => navigate("/search")}
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page app-section">
      {isFetching && (
        <div className="loading-cont">
          <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
        </div>
      )}
      <div className="app-container">
        <h1 className="title">Cart</h1>
        <div className="cart-details">
          <CartItems data={data?.data.cartItems} />
          <CartInfo data={data?.data} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
