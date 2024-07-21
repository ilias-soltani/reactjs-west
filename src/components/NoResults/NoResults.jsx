import React from "react";
import { TbCactusFilled } from "react-icons/tb";

import "./NoResults.scss";

const NoResults = () => {
  return (
    <div className="no-results app-section">
      <div className="app-container">
        <TbCactusFilled />
        No results found
      </div>
    </div>
  );
};

export default NoResults;
