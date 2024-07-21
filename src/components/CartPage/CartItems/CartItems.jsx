import React, { useEffect } from "react";
import HorizontalProductCard from "../../HorizontalProductCard/HorizontalProductCard";
import {
  useUpdateProductQuantityMutation,
  useRemoveCartItemMutation,
} from "../../../app/services/cartApi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { getSize } from "../../../utils/getSize";

import "./CartItems.scss";

const CartItems = ({ data }) => {
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

  useEffect(() => {
    if (appIsError) console.log(appError);
  }, [appIsError, appError]);

  return (
    <div className="cart-items" style={{ opacity: appIsLoading ? "0.5" : "1" }}>
      <table className="cart-items-table">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
        {data.map((item, i) => (
          <tr key={i}>
            <td>
              <HorizontalProductCard item={item} style="large" />
            </td>
            <td className="second-td">
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
            </td>
            <td className="item-total">${item.total.toFixed(2)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CartItems;
