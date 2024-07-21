import React, { useState, useEffect } from "react";
import AppAccordion from "../../Accordion/AppAccordion";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useScreenSize from "../../../hooks/Screen/useScreenSize.js";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { AnimatePresence } from "framer-motion";
import HiddenNavBar from "../../NavBar/components/HiddenNavBar/HiddenNavBar.jsx";
import { HiOutlineXMark } from "react-icons/hi2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { removeParamFromUrl } from "../../../utils/urlParams";

import "./Filters.scss";

const Filters = ({
  countData,
  sortType,
  activeSort,
  setActiveSort,
  setActiveFilters,
  activeFilters,
  setCheckedItems,
  checkedItems,
}) => {
  const screenSize = useScreenSize();
  const [isHidden, setIsHidden] = useState(false);
  const [show, setShow] = useState(false);
  const [activeList, setActiveList] = useState(activeFilters); // New state for active list
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = () => {
    document.body.classList.remove("modal-open");
    setShow(false);
  };

  const handelClick = () => {
    document.body.classList.add("modal-open");
    setShow(true);
  };

  const getDisplayLabel = (filter) => {
    if (filter.name) return filter.name;
    if (filter.display) return filter.display;
    if (filter.colorName) return filter.colorName;
    if (filter.sizeName) return filter.sizeName;
    if (typeof filter.discount === "number") return `${filter.discount}%`;
    return "";
  };

  const getFilterType = (key) => {
    switch (key) {
      case "display":
        return { filterType: "series", filterValue: "_id" };
      case "name":
        return { filterType: "subcategory", filterValue: "_id" };
      case "colorName":
        return { filterType: "color", filterValue: "colorName" };
      case "sizeName":
        return { filterType: "size", filterValue: "sizeName" };
      case "discount":
        return { filterType: "discount", filterValue: "discount" };
      default:
        return "";
    }
  };

  const handleChange = (event, filterItem, list) => {
    const key = Object.keys(filterItem).find((k) => k !== "count");
    const value = filterItem[key];

    if (event.target.checked) {
      const { filterType, filterValue } = getFilterType(key);
      setActiveFilters([
        ...activeFilters,
        { ...filterItem, filterType, filterValue },
      ]);
      setCheckedItems({ ...checkedItems, [value]: true });
    } else {
      setActiveFilters(activeFilters.filter((item) => item[key] !== value));
      setCheckedItems({ ...checkedItems, [value]: false });
    }

    setActiveList(list);
  };

  const handleSortChange = (event, sort) => {
    if (event.target.checked) {
      setActiveSort(sort);
      let url = searchParams.toString();
      url = removeParamFromUrl(url, "sort");
      url = removeParamFromUrl(url, "page");
      navigate(`${location.pathname}?page=1&${url}&sort=${sort.dispaly}`, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");

      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top;
      const windowHeight = window.innerHeight;

      if (footerTop <= windowHeight) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    activeFilters?.map((item) => {
      const key = Object.keys(item).find((k) => k !== "count");
      const { filterValue } = getFilterType(key);

      if (
        !activeList?.data.find(
          (aitem) => aitem[filterValue] === item[filterValue]
        )
      )
        setActiveList(null);
    });

    if (!activeFilters || activeFilters.length === 0) setActiveList(null);
  }, [activeFilters]);

  const renderFilters = (data) => (
    <div className="accordions-list">
      {data.map((item, i) => (
        <div key={i} className="serach-filters-accordion">
          <AppAccordion key={i} title={item.display} paddingStyle="0.5rem">
            <ul className="accordion-list">
              {item.data.map((filter, i) => {
                const key = Object.keys(filter).find((k) => k !== "count");
                const value = filter[key];
                return (
                  <li key={i}>
                    <FormControlLabel
                      className="accordion-lable"
                      control={
                        <Checkbox
                          size="small"
                          onChange={(e) => handleChange(e, filter, item)}
                          color="default"
                          checked={!!checkedItems[value]}
                        />
                      }
                      label={`${getDisplayLabel(filter)} (${filter.count})`}
                    />
                  </li>
                );
              })}
            </ul>
          </AppAccordion>
        </div>
      ))}
    </div>
  );

  if (screenSize === "large") {
    return (
      <div className="serach-filters">
        {activeList
          ? renderFilters([
              ...countData.map((item) =>
                item.display === activeList.display ? activeList : item
              ),
            ])
          : renderFilters(countData)}
      </div>
    );
  } else {
    return (
      <div className="serach-sort-filters">
        <div
          className={`show-btn ${isHidden ? "hidden" : ""}`}
          onClick={handelClick}
        >
          <PiSlidersHorizontalBold /> Sort & Filters
        </div>
        <AnimatePresence>
          {show && (
            <HiddenNavBar setShow={setShow} position={"right"}>
              <div className="hidden-filters">
                <div className="header">
                  Sort & Filters <HiOutlineXMark onClick={handleExit} />
                </div>
                <div className="lists">
                  <div className="serach-filters-accordion">
                    <AppAccordion title={"Sort"} paddingStyle="0.5rem">
                      <RadioGroup
                        className="accordion-list"
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Relevance"
                        name="radio-buttons-group"
                      >
                        {sortType.map((sort, i) => (
                          <FormControlLabel
                            className="accordion-lable"
                            control={
                              <Radio
                                size="small"
                                color="default"
                                onChange={(e) => handleSortChange(e, sort)}
                                checked={activeSort.dispaly === sort.dispaly}
                              />
                            }
                            label={`${sort.dispaly}`}
                            value={`${sort.dispaly}`}
                            key={i}
                          />
                        ))}
                      </RadioGroup>
                    </AppAccordion>
                  </div>
                  {activeList
                    ? renderFilters([
                        ...countData.map((item) =>
                          item.display === activeList.display
                            ? activeList
                            : item
                        ),
                      ])
                    : renderFilters(countData)}
                </div>
                <div className="apply-btn" onClick={handleExit}>
                  Done
                </div>
              </div>
            </HiddenNavBar>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

export default Filters;
