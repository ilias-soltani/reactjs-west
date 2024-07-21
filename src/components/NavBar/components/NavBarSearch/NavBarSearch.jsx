import React from "react";
import HiddenNavBar from "../HiddenNavBar/HiddenNavBar";
import { Link } from "react-router-dom";

import "./NavBarSearch.scss";
import NavSearchInput from "../../../Inputs/NavSearchInput/NavSearchInput";

const NavBarSearch = ({ setShow }) => {
  const handleExit = () => {
    document.body.classList.remove("modal-open");
    setShow(false);
  };

  return (
    <HiddenNavBar setShow={setShow} position={"left"}>
      <NavSearchInput handleExit={handleExit} />

      <nav>
        <h4>Navigation Bar</h4>
        <ul>
          <li>
            <Link to="/new?sort=Date:%20new%20to%20old" onClick={handleExit}>
              New
            </Link>
          </li>
          {["Collections", "Clothing", "Accessories"].map((item) => (
            <li key={item}>
              <Link to={`${item.toLowerCase()}`} onClick={handleExit}>
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/sale" onClick={handleExit}>
              Summer Sale
            </Link>
          </li>
        </ul>
      </nav>
    </HiddenNavBar>
  );
};

export default NavBarSearch;
