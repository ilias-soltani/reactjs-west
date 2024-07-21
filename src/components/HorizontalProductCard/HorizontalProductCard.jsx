import React from "react";
import { useNavigate } from "react-router-dom";
import { getSize } from "../../utils/getSize";
import getDiscountPrice from "../../utils/getDiscountPrice";

import "./HorizontalProductCard.scss";

const HorizontalProductCard = ({
  item,
  style = "default",
  handleExit,
  exit = false,
  quantity = false,
}) => {
  const navigate = useNavigate();

  const productTitle = item.product?.title ?? item.title;
  const coverImage = item.color?.coverImage ?? item.colors?.coverImage;
  const productId = item.product?._id ?? item.colors?.product ?? item._id;
  const colorId = item.color?._id ?? item.colors?._id;
  const price =
    item.colors?.discount > 0
      ? getDiscountPrice(item.price, item.colors.discount)
      : item.price;

  return (
    <div className="horizontal-product-card">
      <div className={`item-image ${style === "large" ? "large" : ""}`}>
        <img src={coverImage} alt={productTitle} />
      </div>
      <div className="product-info">
        <div className="item-info">
          <a
            className="item-title"
            onClick={() => {
              if (exit) handleExit();
              navigate(`/product/${productId}/color/${colorId}`);
            }}
          >
            {productTitle}
          </a>
          <div className="item-price">${price.toFixed(2)}</div>
          {item.size ? (
            <div className="item-size">
              {getSize(item.color, item.size).sizeName}
              {quantity && <span>, {item.quantity}</span>}
            </div>
          ) : (
            quantity && <span className="item-size">{item.quantity}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
