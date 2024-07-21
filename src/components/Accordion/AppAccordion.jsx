import React, { useState } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdKeyboardArrowDown } from "react-icons/md";
import CustomAccordion from "./CostumeAccordion";

import "./AppAccordion.scss";

const AppAccordion = ({ children, title, paddingStyle = "1.5rem" }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <CustomAccordion
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      paddingStyle={paddingStyle}
    >
      <AccordionSummary
        expandIcon={
          <div className={`icon-accordion ${hovered ? "hoverd" : ""}`}>
            <MdKeyboardArrowDown />
          </div>
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <span className="accordion-title">{title}</span>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </CustomAccordion>
  );
};

export default AppAccordion;
