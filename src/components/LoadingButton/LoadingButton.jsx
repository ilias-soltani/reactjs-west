import React from "react";
import { BeatLoader } from "react-spinners";

import "./LoadingButton.scss";

const LoadingButton = ({
  isLoading,
  size,
  color,
  title,
  styleClass,
  handelClick,
}) => {
  return (
    <button
      className={`main-btn ${styleClass} ${isLoading ? "loading" : ""}`}
      disabled={isLoading}
      onClick={handelClick}
    >
      <span className="text">{title}</span>
      <div className="loading-icon">
        <BeatLoader color={color} size={size} />
      </div>
    </button>
  );
};

export default LoadingButton;
