import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { removeParamFromUrl } from "../../utils/urlParams";

import "./Pagination.scss";

const Pagination = ({ pagination, activePage, setActivePage }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPage = () => {
    if (activePage !== pagination.numberOfPages) {
      setActivePage(activePage + 1);
      let url = searchParams.toString();
      url = removeParamFromUrl(url, "page");
      navigate(`${location.pathname}?page=${activePage + 1}&${url}`);
    }
  };

  const pervPage = () => {
    if (activePage !== 1) {
      setActivePage(activePage - 1);
      let url = searchParams.toString();
      url = removeParamFromUrl(url, "page");
      navigate(`${location.pathname}?page=${activePage - 1}&${url}`);
    }
  };

  return (
    <div className="app-pagination">
      <div
        className={`arrow-back icon ${activePage === 1 ? "disabled" : ""}`}
        onClick={pervPage}
      >
        <IoIosArrowBack />
      </div>
      <div className="pagination-page">
        {activePage} / {pagination.numberOfPages}
      </div>
      <div
        className={`arrow-next icon ${
          activePage === pagination.numberOfPages ? "disabled" : ""
        }`}
        onClick={nextPage}
      >
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default Pagination;
