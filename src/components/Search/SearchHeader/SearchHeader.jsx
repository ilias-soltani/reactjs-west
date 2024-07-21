import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Autocomplete from "../../Autocomplete/Autocomplete";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { removeParamFromUrl } from "../../../utils/urlParams";
import ActiveFilters from "../ActiveFilters/ActiveFilters";

import "./SearchHeader.scss";

const SearchHeader = ({
  sortType,
  activeSort,
  setActiveSort,
  setActiveFilters,
  activeFilters,
  setCheckedItems,
  checkedItems,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  return (
    <div className="search-header">
      <div className="filters-header">
        <PiSlidersHorizontalBold /> Filters
      </div>
      <div className="main-search-header">
        <div className="sec-search-header">
          <form
            className="search-input"
            onSubmit={(e) => {
              e.preventDefault();
              let url = searchParams.toString();
              url = removeParamFromUrl(url, "keyword");
              url = removeParamFromUrl(url, "page");
              navigate(
                `${location.pathname}?page=${1}&${url}&keyword=${input}`
              );
              setInput("");
            }}
          >
            <input
              type="text"
              placeholder="Search for..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div
              className="search-icon"
              onClick={() =>
                navigate(`${location.pathname}?page=${1}&keyword=${input}`)
              }
            >
              <FiSearch />
            </div>
          </form>
          <div className="sort-container">
            <span>Sort by:</span>
            <Autocomplete
              activeData={activeSort}
              setActiveData={setActiveSort}
              data={sortType}
              dispaly={"dispaly"}
              style={"sort-style"}
              isNavigate={true}
            />
          </div>
        </div>
        <ActiveFilters
          setActiveFilters={setActiveFilters}
          setCheckedItems={setCheckedItems}
          checkedItems={checkedItems}
          activeFilters={activeFilters}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
