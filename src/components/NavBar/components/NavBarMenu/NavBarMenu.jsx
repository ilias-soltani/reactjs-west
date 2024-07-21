import React, { useState, useEffect } from "react";
import HiddenNavBar from "../HiddenNavBar/HiddenNavBar";
import { HiOutlineXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import MotionComponent from "../../../MotionComponent/MotionComponent";

import "./NavBarMenu.scss";

const NavBarMenu = ({
  setShow,
  clothingList,
  collectionsList,
  accessoriesList,
}) => {
  const [showActive, setActive] = useState("main");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (showActive === "clothing") setData(clothingList);
    else if (showActive === "collections") setData(collectionsList);
    else if (showActive === "accessories") setData(accessoriesList);
    else setData([]);
  }, [showActive]);

  const handleExit = () => {
    document.body.classList.remove("modal-open");
    setShow(false);
  };

  return (
    <HiddenNavBar setShow={setShow} position={"right"}>
      <div className="content">
        <div className="icon" onClick={handleExit}>
          <HiOutlineXMark />
        </div>

        <AnimatePresence mode="wait">
          {showActive === "main" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                translateX: "-100%",
                opacity: 0,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              className="main-list"
            >
              <li>
                <Link to="/new?sort=Date:%20new%20to%20old">New</Link>
              </li>
              {[, "Collections", "Clothing", "Accessories"].map(
                (item, index) => (
                  <li key={index} onClick={() => setActive(item.toLowerCase())}>
                    {item}
                    <div className="icon">
                      <IoIosArrowForward />
                    </div>
                  </li>
                )
              )}
              <li>
                <Link to="/sale" className="red">
                  Summer Sale
                </Link>
              </li>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showActive != "main" && (
            <motion.div
              className="other-nav-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                translateX: "100%",
                opacity: 0,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
            >
              <motion.div
                initial={{ translateY: -25, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="back"
                onClick={() => setActive("main")}
              >
                <div className="icon-back">
                  <IoIosArrowBack />
                </div>
                <h4>{showActive}</h4>
              </motion.div>
              <div className="list">
                {data?.map((item, i) => (
                  <MotionComponent
                    as={Link}
                    key={item._id + i}
                    to={
                      data !== collectionsList
                        ? `/subcategories/${item._id}`
                        : `/collections/${item._id}`
                    }
                    initial={{ translateY: -25, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    onClick={handleExit}
                  >
                    {item.display || item.name}
                  </MotionComponent>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HiddenNavBar>
  );
};

export default NavBarMenu;
