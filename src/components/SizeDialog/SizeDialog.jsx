import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import HorizontalProductCard from "../HorizontalProductCard/HorizontalProductCard";
import { HiOutlineXMark } from "react-icons/hi2";
import { findAvailableSize } from "../../utils/findAvailableSize";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useAddToCartMutation } from "../../app/services/cartApi";
import { useDispatch } from "react-redux";
import { setCartMenu } from "../../app/services/cartMenuSlice";

import "./SizeDialog.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SizeDialog = ({ open, setOpen, product }) => {
  const [addToCart, { isError, isLoading, error, isSuccess }] =
    useAddToCartMutation();
  const dispatch = useDispatch();

  const [activeSize, setActiveSize] = useState(
    findAvailableSize(product.colors)
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handelSizeClick = (size) => {
    if (size.sizeQuantity > 0) setActiveSize(size);
  };

  const handelClick = async () => {
    let body = {
      product: product._id,
      color: product.colors._id,
      quantity: 1,
      size: activeSize._id,
    };

    await addToCart(body);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      document.body.classList.add("modal-open");
      dispatch(setCartMenu(true));
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: "1rem",
          maxWidth: "none",
          minWidth: "530px",
          width: "auto",
        },
        sx: {
          "@media (max-width: 767px)": {
            width: "calc(100% - 2rem) !important",
            margin: "1rem !important",
            minWidth: "0 !important",
          },
        },
      }}
    >
      <div className="dialog-product-header">
        <HorizontalProductCard
          item={product}
          style={"large"}
          handleExit={handleClose}
          exit={true}
        />
        <div className="icon" onClick={handleClose}>
          <HiOutlineXMark />
        </div>
      </div>

      <div className="sizes">
        <span className="active-size">
          Size: <span>{activeSize?.sizeName}</span>
        </span>

        <div className="color-sizes">
          {product.colors.sizes.map((size, i) => (
            <div
              className={`product-size flex-center ${
                activeSize._id === size._id ? "active" : ""
              } ${size.sizeQuantity === 0 ? "disabled" : ""}`}
              key={size._id + i}
              onClick={() => handelSizeClick(size)}
            >
              {size.sizeName}
            </div>
          ))}
        </div>

        <LoadingButton
          color={"#fff"}
          styleClass={"add-size-cart"}
          size={8}
          title={"Add to cart"}
          handelClick={handelClick}
          isLoading={isLoading}
        />
      </div>
    </Dialog>
  );
};

export default SizeDialog;
