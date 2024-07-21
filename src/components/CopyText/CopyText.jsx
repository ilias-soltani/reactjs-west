import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

const CopyText = ({ text }) => {
  const [active, setActive] = useState(false);
  const handelClick = () => {
    setActive(true);
    navigator.clipboard.writeText(text);

    setTimeout(() => {
      setActive(false);
    }, 2000);
  };
  return (
    <div
      className={`copy-icon ${active ? "active" : ""}`}
      onClick={handelClick}
    >
      <MdContentCopy />
    </div>
  );
};

export default CopyText;
