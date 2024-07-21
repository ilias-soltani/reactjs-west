import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AppImage from "../AppImage/AppImage";
import { useDispatch } from "react-redux";
import { setCartMenu } from "../../app/services/cartMenuSlice";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useAddToCartMutation } from "../../app/services/cartApi";
import SizeDialog from "../SizeDialog/SizeDialog";
import Snackbar from "@mui/material/Snackbar";

import "./ProductCard.scss";
import getDiscountPrice from "../../utils/getDiscountPrice";

const ProductCard = ({ product }) => {
  const token = localStorage.getItem("token");
  const [hoverd, setHoverd] = useState(false);
  const [open, setOpen] = useState(false);
  const [addToCart, { isError, isLoading, error, isSuccess, data }] =
    useAddToCartMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = window.innerWidth <= 767;

  const handelClick = async (e) => {
    e.stopPropagation();
    if (token) {
      if (!product.colors.sizes || product.colors.sizes?.length === 0)
        await addToCart({
          product: product._id,
          color: product.colors._id,
          quantity: 1,
        });
      else {
        setOpen(true);
        setHoverd(true);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      document.body.classList.add("modal-open");
      dispatch(setCartMenu(true));
    }
  }, [isSuccess, isError]);

  return (
    <div style={{ position: "relative" }}>
      <div
        className={`product-card ${
          hoverd && product.colors.hoverImage && !isMobile ? "hoverd" : ""
        }`}
        onMouseEnter={() => !isMobile && setHoverd(true)}
        onMouseLeave={() => !isMobile && setHoverd(false)}
        onClick={() =>
          navigate(`/product/${product._id}/color/${product.colors._id}`)
        }
      >
        <div className="product-card-image">
          <AppImage
            src={product.colors.coverImage}
            alt={product.title}
            className="cover-image"
            loading="lazy"
          />
          {product.colors.hoverImage && (
            <img
              src={product.colors.hoverImage}
              className="hover-image"
              alt={product.title}
              loading="lazy"
            />
          )}
          {product.colors.discount > 0 && (
            <div className="product-card-discount">
              Save {product.colors.discount}%
            </div>
          )}

          <LoadingButton
            styleClass={"quick-add-btn"}
            title={
              <span>
                <FaPlus /> Quick add
              </span>
            }
            size={7}
            handelClick={handelClick}
            isLoading={isLoading}
          />
        </div>
        <div className="product-card-text-info">
          <span className="product-card-title">{product.title}</span>
          <span className="product-card-color">{product.colors.colorName}</span>
          <span className="product-card-price">
            {product.colors.discount > 0 && (
              <div className="product-card-discount-price">
                $
                {getDiscountPrice(
                  product.price,
                  product.colors.discount
                ).toFixed(2)}
              </div>
            )}
            <span className={`${product.colors.discount > 0 ? "through" : ""}`}>
              ${product.price.toFixed(2)}
            </span>
          </span>
        </div>
      </div>
      {product.colors.sizes && product.colors.sizes?.length > 0 && (
        <SizeDialog open={open} setOpen={setOpen} product={product} />
      )}
    </div>
  );
};

export default ProductCard;
