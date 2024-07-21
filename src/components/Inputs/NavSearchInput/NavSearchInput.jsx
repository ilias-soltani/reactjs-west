import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import "./NavSearchInput.scss";

const NavSearchInput = ({ handleExit }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  return (
    <div className="nav-search-input">
      <input
        type="text"
        placeholder="Search for..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onSubmit={() => navigate(`/search?keyword=${input}`)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?page=1&keyword=${input}`);
            handleExit();
          }
        }}
      />
      <span className={`${input ? "show" : ""}`} onClick={() => setInput("")}>
        Clear
      </span>
      <div className="icon" onClick={() => handleExit()}>
        <HiOutlineXMark />
      </div>
    </div>
  );
};

export default NavSearchInput;
