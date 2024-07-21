import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Dropdown from "./components/Dropdown/Dropdown";
import NavBarSearch from "./components/NavBarSearch/NavBarSearch";
import { AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useGetCollectionsQuery } from "../../app/services/collectionApi";
import { useGetCategoriesQuery } from "../../app/services/categoryApi";
import { useSelector, useDispatch } from "react-redux";
import CartMenu from "../CartMenu/CartMenu";
import { setCartMenu } from "../../app/services/cartMenuSlice";
import { useNavigate, useLocation } from "react-router-dom";

import useNavbarVisibility from "../../hooks/NavBar/useNavbarVisibility";
import logo from "../../assets/images/logo-trans.png";
import "./NavBar.scss";
import NavBarMenu from "./components/NavBarMenu/NavBarMenu";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { nav, active, isCostume } = useNavbarVisibility();
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { data } = useGetCollectionsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const { cartMenu } = useSelector((state) => state.CartMenu);
  const [showCartMenu, setShowCartMenu] = useState(cartMenu);
  const dispatch = useDispatch();

  const handleDropdownHover = () => setIsDropdownHovered(true);
  const handleDropdownLeave = () => setIsDropdownHovered(false);

  const handelSearchClick = () => {
    document.body.classList.add("modal-open");
    setShowSearch(true);
  };

  const handelMenuClick = () => {
    document.body.classList.add("modal-open");
    setShowMenu(true);
  };

  const handelCartClick = () => {
    if (!token) return navigate("/login");

    if (location.pathname !== "/cart") {
      document.body.classList.add("modal-open");
      dispatch(setCartMenu(!cartMenu));
    }
  };

  useEffect(() => {
    setShowCartMenu(cartMenu);
  }, [cartMenu]);

  return (
    <div
      className={`${
        isCostume ? "app-navbar nav-costume" : "app-navbar nav-default"
      } ${!isCostume ? "" : active ? "active" : ""} ${
        isDropdownHovered && !active ? "dropdown-hovered" : ""
      }`}
      ref={nav}
    >
      <div className="app-container">
        <div className="hamburger" onClick={handelMenuClick}>
          <RxHamburgerMenu />
        </div>
        <div className="main-nav">
          <ul>
            <li>
              <Link to="/new?sort=Date:%20new%20to%20old">New</Link>
            </li>
            <Dropdown
              href={"/collections"}
              data={data?.data}
              onHover={handleDropdownHover}
              onLeave={handleDropdownLeave}
            >
              Collections
            </Dropdown>
            {categories?.data.map((category) => (
              <Dropdown
                key={category._id}
                href={`${category.name.toLowerCase()}`}
                data={category.subcategories}
                onHover={handleDropdownHover}
                onLeave={handleDropdownLeave}
              >
                {category.name}
              </Dropdown>
            ))}
            <li>
              <Link to="/sale" className="red">
                Summer Sale
              </Link>
            </li>
          </ul>
        </div>
        <Link className="logo" to={"/"}>
          <img src={logo} alt="west-logo" />
        </Link>
        <div className="secondary-nav">
          <ul>
            {["About", "Store", "Support"].map((item) => (
              <li key={item}>
                <a href="">{item}</a>
              </li>
            ))}
          </ul>
          <ul>
            <li onClick={handelSearchClick}>
              <FiSearch />
            </li>
            <li>
              <Link to={token ? "/profile" : "/login"}>
                <BiUser />
              </Link>
            </li>
            <li>
              <div onClick={handelCartClick} className="flex-center">
                <HiOutlineShoppingBag />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {showSearch && <NavBarSearch setShow={setShowSearch} exitBeforeEnter />}
        {showMenu && (
          <NavBarMenu
            setShow={setShowMenu}
            exitBeforeEnter
            clothingList={categories?.data[0].subcategories}
            accessoriesList={categories?.data[1].subcategories}
            collectionsList={data?.data}
          />
        )}
        {showCartMenu && <CartMenu />}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
