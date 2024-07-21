import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import MotionComponent from "../../../MotionComponent/MotionComponent";

import "./Dropdown.scss";

const Dropdown = ({ children, href, onHover, onLeave, data }) => {
  const [open, setOpen] = useState(false);

  const onMouseEnterHandler = () => {
    setOpen(true);
    onHover();
  };

  const onMouseLeaveHandler = () => {
    setOpen(false);
    onLeave();
  };

  return (
    <li
      className="dropdown-container"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Link to={href}>{children}</Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="app-dropdown-menu"
          >
            <div className="bridge"></div>
            {data.map((item, i) => (
              <MotionComponent
                as={Link}
                key={item + i}
                to={
                  href !== "/collections"
                    ? `/subcategories/${item._id}`
                    : `/collections/${item._id}`
                }
                initial={{ translateY: -25, opacity: 0 }}
                animate={{ translateY: 0, opacity: 0.7 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                {item.name}
              </MotionComponent>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Dropdown;
