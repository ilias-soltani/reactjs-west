import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";

const CustomAccordion = styled(Accordion)(({ theme, paddingStyle }) => {
  return {
    boxShadow: "none", // this styles directly apply to accordion
    border: `none`,
    ".MuiAccordionDetails-root": { padding: "0 0 1rem 0" },
    ".MuiAccordionSummary-root": {
      padding: `${paddingStyle} 0`,
      margin: "0 !important",
    }, // this apply to Summary
  };
});

export default CustomAccordion;
