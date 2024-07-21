import React from "react";
import { motion } from "framer-motion";
import useScreenSize from "../../../../hooks/Screen/useScreenSize.js";

import "./HiddenNavBar.scss";

const HiddenNavBar = ({ setShow, children, position, largeWidth = false }) => {
  const screenSize = useScreenSize();

  const handleExit = () => {
    document.body.classList.remove("modal-open");
    setShow(false);
  };

  return (
    <motion.div
      className="hidden-nav-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      onClick={() => handleExit()}
    >
      <motion.div
        className={`hidden-area ${position}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ width: "0" }}
        animate={{
          width: largeWidth
            ? screenSize === "medium"
              ? "60%"
              : screenSize === "small"
              ? "calc(100% - 2rem)"
              : "50%"
            : screenSize === "medium"
            ? "60%"
            : screenSize === "small"
            ? "calc(100% - 2rem)"
            : "43%",
        }}
        exit={{ width: "0", transition: { delay: 0.2, duration: 0.3 } }}
        transition={{ delay: 0.3, duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="cont"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          transition={{ delay: 0.6, duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HiddenNavBar;
