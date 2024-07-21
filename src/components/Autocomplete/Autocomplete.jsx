import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { removeParamFromUrl } from "../../utils/urlParams";

import "./Autocomplete.scss";

const Autocomplete = ({
  activeData,
  setActiveData,
  data,
  dispaly,
  style = "default",
  isNavigate = false,
}) => {
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handelOnCilck = (item) => {
    if (dispaly === "sizeName" && item.sizeQuantity === 0) return false;
    setActiveData(item);
    if (isNavigate) {
      let url = searchParams.toString();
      url = removeParamFromUrl(url, "sort");
      url = removeParamFromUrl(url, "page");
      navigate(`${location.pathname}?page=1&${url}&sort=${item[dispaly]}`, {
        replace: true,
      });
    }
  };

  return (
    <div
      className={`app-autocomplete ${show ? "show" : ""} ${style}`}
      onClick={() => setShow(!show)}
    >
      {activeData[dispaly]}
      <div className="icon">
        <MdKeyboardArrowDown />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="app-autocomplete-list"
            initial={{ y: -25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul>
              {data.map((item, i) => (
                <li
                  key={i}
                  className={`${
                    dispaly === "sizeName"
                      ? item.sizeQuantity === 0
                        ? "disabled"
                        : ""
                      : ""
                  }`}
                  onClick={() => handelOnCilck(item)}
                >
                  {item[dispaly]}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Autocomplete;
