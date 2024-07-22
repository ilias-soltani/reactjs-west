import React, { useEffect } from "react";
import HorizontalProductCard from "../../HorizontalProductCard/HorizontalProductCard";
import {
  useUpdateProductQuantityMutation,
  useRemoveCartItemMutation,
} from "../../../app/services/cartApi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import { getSize } from "../../../utils/getSize";

const CartMenuItems = ({ data, handleExit }) => {
  const [
    updateProductQuantity,
    {
      isError: quantityIsError,
      isLoading: quantityLoading,
      error: quantityError,
    },
  ] = useUpdateProductQuantityMutation();

  const [
    removeCartItem,
    { isError: removeIsError, isLoading: removeLoading, error: removeError },
  ] = useRemoveCartItemMutation();

  const appIsLoading = quantityLoading || removeLoading;
  const appIsError = quantityIsError || removeIsError;
  const appError = quantityError || removeError;

  const onAdd = async (item) => {
    if (!appIsLoading) {
      const maxQuantity = item.size
        ? getSize(item.color, item.size).sizeQuantity
        : item.color.colorQuantity;
      if (item.quantity !== maxQuantity) {
        await updateProductQuantity({
          id: item._id,
          quantity: item.quantity + 1,
        });
      }
    }
  };

  const onMinus = async (item) => {
    if (!appIsLoading) {
      if (item.quantity !== 1) {
        await updateProductQuantity({
          id: item._id,
          quantity: item.quantity - 1,
        });
      }
    }
  };

  const removeItem = async (item) => {
    if (!appIsLoading) {
      await removeCartItem(item._id);
    }
  };

  // useEffect(() => {}, [appIsError, appError]);
  return (
    <div
      className="cart-menu-items"
      style={{ opacity: appIsLoading ? "0.5" : "1" }}
    >
      <div className="cart-menu-container">
        <div className="header">
          <h6>Cart</h6>
          <div className="icon flex-center" onClick={handleExit}>
            <HiOutlineXMark />
          </div>
        </div>

        <div className="cart-items-products">
          {data.map((item, i) => (
            <div className="cart-items-menu-item" key={i}>
              <HorizontalProductCard
                item={item}
                style={"large"}
                handleExit={handleExit}
                exit={true}
              />
              <div className="actions">
                <div className="cart-quantity-selecte">
                  <span onClick={() => onMinus(item)}>
                    <FaMinus />
                  </span>
                  <span>{item.quantity}</span>
                  <span onClick={() => onAdd(item)}>
                    <FaPlus />
                  </span>
                </div>
                <span className="remove-item" onClick={() => removeItem(item)}>
                  Remove
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartMenuItems;
