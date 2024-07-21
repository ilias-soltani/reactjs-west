import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

import "./QuantitySelecte.scss";

const QuantitySelecte = ({ actievQuantity, maxQuantity, setQuantity }) => {
  const onAdd = () => {
    if (actievQuantity !== maxQuantity) setQuantity(actievQuantity + 1);
  };

  const onMinus = () => {
    if (actievQuantity !== 1) setQuantity(actievQuantity - 1);
  };
  return (
    <div className="quantity-selecte">
      <span onClick={onMinus}>
        <FaMinus />
      </span>
      <span>{actievQuantity}</span>
      <span onClick={onAdd}>
        <FaPlus />
      </span>
    </div>
  );
};

export default QuantitySelecte;
