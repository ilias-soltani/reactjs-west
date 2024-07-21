import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

import "./ActiveFilters.scss";

const ActiveFilters = ({
  setActiveFilters,
  activeFilters,
  setCheckedItems,
  checkedItems,
}) => {
  const getDisplayLabel = (filter) => {
    if (filter.name) return filter.name;
    if (filter.display) return filter.display;
    if (filter.colorName) return filter.colorName;
    if (filter.sizeName) return filter.sizeName;
    if (typeof filter.discount === "number") return `${filter.discount}%`;
    return "";
  };

  const handleRemoveFilter = (filterItem) => {
    const key = Object.keys(filterItem).find((k) => k !== "count");
    const value = filterItem[key];

    setActiveFilters(activeFilters.filter((item) => item[key] !== value));
    setCheckedItems({ ...checkedItems, [value]: false });
  };

  return (
    <div className="active-filters">
      {activeFilters.map((filterItem, i) => (
        <div className="active-filters-item" key={i}>
          {`${getDisplayLabel(filterItem)}`}{" "}
          <HiOutlineXMark onClick={() => handleRemoveFilter(filterItem)} />
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
