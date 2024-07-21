import React, { useState, useEffect } from "react";
import Filters from "../components/Search/Filters/Filters";
import Results from "../components/Search/Results/Results";
import SearchHeader from "../components/Search/SearchHeader/SearchHeader";
import { useGetProductsQuery } from "../app/services/productApi";
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import {
  addParamToUrl,
  removeParamFromUrl,
  queryStringToObject,
} from "../utils/urlParams";
import { getSortType, sortType } from "../utils/getSortType";
import NoResults from "../components/NoResults/NoResults";

const SearchPage = ({ defultUrl = "limit=24&count=true" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [activePage, setActivePage] = useState(+searchParams.get("page") || 1);
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [activeSort, setActiveSort] = useState(
    getSortType(searchParams.get("sort"))
  );
  const { id } = useParams();

  const dataUrl = id
    ? location.pathname.split("/")[1] == "collections"
      ? `${defultUrl}&series=${id}`
      : `${defultUrl}&subcategory=${id}`
    : defultUrl;

  const [urlQuery, setUrlQuery] = useState(dataUrl);
  const [activeFilters, setActiveFilters] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional if you want to skip the scrolling animation
    });
    if (!searchParams.get("page"))
      setSearchParams(
        {
          ...queryStringToObject(searchParams.toString()),
          page: "1",
        },
        { replace: true }
      );
    if (!searchParams.get("sort"))
      setSearchParams(
        {
          ...queryStringToObject(searchParams.toString()),
          sort: "relevance",
        },
        { replace: true }
      );

    setActivePage(+searchParams.get("page"));
    setActiveSort(getSortType(searchParams.get("sort")));
    setKeyword(searchParams.get("keyword"));

    let url = addParamToUrl(
      dataUrl,
      "page",
      searchParams.get("page") || activePage
    );

    url = addParamToUrl(
      url,
      "sort",
      getSortType(searchParams.get("sort")).sort
    );

    url = addParamToUrl(url, "keyword", searchParams.get("keyword"));

    activeFilters.forEach((item) => {
      url = addParamToUrl(url, item.filterType, item[item.filterValue]);
    });

    setUrlQuery(url);
  }, [searchParams, activeFilters]);

  useEffect(() => {
    setSearchParams(
      {
        ...queryStringToObject(searchParams.toString()),
        page: "1",
      },
      { replace: true }
    );
  }, [activeFilters]);

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetProductsQuery(urlQuery);

  const pagination = productsData?.pagination;

  if (isLoading) {
    return (
      <div className="app-section prodcut-page-loading">
        <div className="app-container">
          <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
        </div>
      </div>
    );
  } else if (productsData?.data.length > 0) {
    return (
      <div className="app-section">
        <div className="app-container">
          {keyword && (
            <div className="search-keyword">Results for "{keyword}"</div>
          )}
          <SearchHeader
            sortType={sortType}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            setActiveFilters={setActiveFilters}
            setCheckedItems={setCheckedItems}
            checkedItems={checkedItems}
            activeFilters={activeFilters}
          />
          <div className="search-container">
            <Filters
              countData={productsData?.countData}
              sortType={sortType}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
              setActiveFilters={setActiveFilters}
              setCheckedItems={setCheckedItems}
              checkedItems={checkedItems}
              activeFilters={activeFilters}
            />
            <Results
              products={productsData?.data}
              pagination={pagination}
              activePage={+activePage}
              setActivePage={setActivePage}
              isLoading={isFetching || isLoading}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <NoResults />;
  }
};

export default SearchPage;
