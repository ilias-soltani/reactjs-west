import React, { useState, useEffect } from "react";
import Autocomplete from "../../Autocomplete/Autocomplete";
import QuantitySelecte from "../../QuantitySelecte/QuantitySelecte";
import AppAccordion from "../../Accordion/AppAccordion";
import { TbPointFilled } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import getDiscountPrice from "../../../utils/getDiscountPrice";
import { useNavigate } from "react-router-dom";
import HorizontalProductCard from "../../HorizontalProductCard/HorizontalProductCard";
import LoadingButton from "../../LoadingButton/LoadingButton";
import { useAddToCartMutation } from "../../../app/services/cartApi";
import { useDispatch } from "react-redux";
import { setCartMenu } from "../../../app/services/cartMenuSlice";
import SizeDialog from "../../SizeDialog/SizeDialog";

import "./ActiveDetails.scss";

const ActiveDetails = ({ product, color, similarProducts }) => {
  const token = localStorage.getItem("token");
  const [addToCart, { isError, isLoading, error, isSuccess }] =
    useAddToCartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeSize, setActiveSize] = useState(
    color.sizes && color.sizes.length > 0 ? color.sizes[0] : false
  );

  const [open, setOpen] = useState(false);
  const [otherLoading, setOtherLoading] = useState({
    isLoading: false,
    _id: null,
  });

  const handelClick = async (product) => {
    if (token) {
      if (!product.colors.sizes || product.colors.sizes?.length === 0) {
        setOtherLoading({ isLoading: true, _id: product._id });
        await addToCart({
          product: product._id,
          color: product.colors._id,
          quantity: 1,
        });
        setOtherLoading({ isLoading: false, _id: null });
      } else {
        setOpen(true);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setActiveSize(
      color.sizes && color.sizes.length > 0 ? color.sizes[0] : false
    );
  }, [color]);

  const [quantity, setQuantity] = useState(1);

  const addItemToCart = async () => {
    if (token) {
      let body = {
        product: product._id,
        color: color._id,
        quantity,
      };
      if (activeSize) {
        body.size = activeSize._id;
      }

      await addToCart(body);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setQuantity(1);
  }, [activeSize]);

  useEffect(() => {
    if (isSuccess) {
      document.body.classList.add("modal-open");
      dispatch(setCartMenu(true));
    }
  }, [isSuccess]);

  let accordions = [];
  if (Array.isArray(product.details) && product.details.length > 0) {
    accordions.push({ title: "Product Details", list: [...product.details] });
  }
  if (Array.isArray(product.fits) && product.fits.length > 0) {
    accordions.push({ title: "Size & Fits", list: [...product.fits] });
  }
  if (Array.isArray(product.compositions) && product.compositions.length > 0) {
    accordions.push({
      title: "Compositions & care",
      list: [...product.compositions],
    });
  }

  return (
    <div className="active-color app-container">
      <h2 className="product-title">{product.title}</h2>
      <div className="product-price">
        {color.discount > 0 && (
          <div className="product-card-discount-price">
            ${getDiscountPrice(product.price, color.discount).toFixed(2)}
          </div>
        )}
        <span className={`${color.discount > 0 ? "through" : ""}`}>
          ${product.price.toFixed(2)}
        </span>
        {color.discount > 0 && (
          <div className="product-card-discount">Save {color.discount}%</div>
        )}
      </div>
      <span className="product-color-name">
        Colour: <span>{color.colorName}</span>
      </span>
      <div className="prodcut-images">
        {product.colors.map((colorItem) => (
          <div
            className={`prodcut-color-image ${
              color._id === colorItem._id ? "active" : ""
            }`}
            key={colorItem._id}
            onClick={() =>
              navigate(`/product/${product._id}/color/${colorItem._id}`)
            }
          >
            <img src={colorItem.coverImage} alt={colorItem.colorName} />
          </div>
        ))}
      </div>
      {activeSize && (
        <span className="product-color-size">
          Size: <span>{activeSize.sizeName}</span>
        </span>
      )}
      {activeSize && (
        <Autocomplete
          activeData={activeSize}
          setActiveData={setActiveSize}
          data={color.sizes}
          dispaly={"sizeName"}
        />
      )}
      <div className="quantity-container">
        Quantity:
        <QuantitySelecte
          actievQuantity={quantity}
          maxQuantity={
            activeSize ? activeSize.sizeQuantity : color.colorQuantity
          }
          setQuantity={setQuantity}
        />
      </div>
      <p className="p">
        Same-day shipping available on USA orders placed Monday to Friday before
        2pm (Bank Holidays Excluded)
      </p>
      <div className="sticky-div">
        <LoadingButton
          styleClass={"add-cart-btn"}
          title={"Add to cart"}
          color={"#fff"}
          isLoading={isLoading}
          handelClick={addItemToCart}
          size={10}
        />
        {accordions.length > 0 && (
          <div className="product-details-accordions">
            {accordions.map((item, i) => (
              <AppAccordion key={i} title={item.title}>
                <ul className="accordion-list">
                  {item.list.map((item, j) => (
                    <li key={j}>
                      <TbPointFilled />
                      {item}
                    </li>
                  ))}
                </ul>
              </AppAccordion>
            ))}
          </div>
        )}
        <div className="similar-products">
          {similarProducts.map((item, i) => (
            <div className="similar-item" key={i}>
              <div className="info">
                <HorizontalProductCard item={item} />
                <LoadingButton
                  styleClass={"add-btn"}
                  color={"#000"}
                  title={
                    <span>
                      <FaPlus /> Add
                    </span>
                  }
                  handelClick={() => handelClick(item)}
                  size={6}
                  isLoading={
                    otherLoading.isLoading && otherLoading._id === item._id
                  }
                />

                {item.colors.sizes && item.colors.sizes?.length > 0 && (
                  <SizeDialog open={open} setOpen={setOpen} product={item} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveDetails;
