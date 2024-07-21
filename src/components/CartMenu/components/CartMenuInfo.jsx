import React from "react";
import { useNavigate } from "react-router-dom";

const CartMenuInfo = ({ data, handleExit }) => {
  const navigate = useNavigate();
  const handelClick = () => {
    handleExit();
    navigate("/cart");
  };
  return (
    <div className="cart-menu-info">
      <div className="cart-menu-container">
        <div className="subtotal-header">
          <span>Total</span>
          <span className={`subtotal ${data.discount ? "discount" : ""}`}>
            <span className="main"> ${data.totalPrice.toFixed(2)} USD</span>
            {data.discount && (
              <span className="sec">
                ${data.totalPriceAfterDiscount.toFixed(2)} USD
              </span>
            )}
          </span>
        </div>
        <p className="header-p">
          Tax included and shipping calculated at checkout
        </p>
        <p className="p-red">
          Sale items purchased will only be eligible for exchange/store credit
          unless stated otherwise. This applies to both in store and online
          orders. This includes sitewide sales and promotional events.
        </p>

        <p className="p-text">
          International orders may incur customs charges that are not included
          in the shipping fee. Please refer to our FAQs for more information
          regarding customs charges/import fees.
        </p>

        <button className="main-btn view-btn" onClick={handelClick}>
          View cart
        </button>
      </div>
    </div>
  );
};

export default CartMenuInfo;
