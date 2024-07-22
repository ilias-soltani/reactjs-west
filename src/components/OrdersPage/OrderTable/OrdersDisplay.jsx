import React from "react";
import HorizontalProductCard from "../../HorizontalProductCard/HorizontalProductCard";
import { formatDate } from "../../../utils/formatDate";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { findLastTrueIndex } from "../../../utils/findLastTrueIndex";

import "./OrderTable.scss";

const OrdersDisplay = ({ data }) => {
  return (
    <div className="orders-display">
      {data.map((item, index) => {
        const steps = [
          {
            label: "Preparation",
            description: `Your order is being prepared.`,
          },
          {
            label: `In Transit to ${item.shippingAddress.country}`,
            description: `Your order is on its way to ${item.shippingAddress.country}.`,
          },
          {
            label: `In Transit to ${item.shippingAddress.city}`,
            description: `Your order is on its way to ${item.shippingAddress.city}.`,
          },
          {
            label: "Out for Delivery",
            description: `Your order is out for delivery.`,
          },
        ];

        return (
          <div className="order-item" key={index}>
            <div className="order-header">
              <span>{item.shippingAddress.alias}</span>
              <span>{formatDate(item.createdAt)}</span>
            </div>
            <span className="item-address">
              {item.shippingAddress.country}, {item.shippingAddress.city},{" "}
              {item.shippingAddress.postalCode}, {item.shippingAddress.phone}
            </span>

            <div className="order-products">
              {item.cartItems.map((cartItem, i) => {
                const product = {
                  ...cartItem.product,
                  color: cartItem.color,
                  size: cartItem.size,
                  quantity: cartItem.quantity,
                  price: cartItem.price,
                };
                return (
                  <div key={i}>
                    <HorizontalProductCard
                      style="large"
                      item={product}
                      quantity={true}
                    />
                  </div>
                );
              })}
            </div>

            <div className="order-info">
              <div className="payments-info">
                <div className="pay-header total">
                  <span>Total</span>
                  <span>${item.totalOrderPrice.toFixed(2)} USD</span>
                </div>
                <div className="pay-header">
                  <span>Tax price</span>
                  <span>${item.taxPrice.toFixed(2)} USD</span>
                </div>
                <div className="pay-header">
                  <span>Shipping price</span>
                  <span>${item.shippingPrice.toFixed(2)} USD</span>
                </div>
                <div className="pay-header">
                  <span>Payment method</span> <span>{item.paymentMethod}</span>
                </div>
              </div>

              <div className="delivery-info">
                {(() => {
                  const activeStep = findLastTrueIndex(item.isDelivered);
                  return (
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={step.label}>
                          <StepLabel>{step.label}</StepLabel>
                          <StepContent>
                            <Typography>{step.description}</Typography>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  );
                })()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersDisplay;
