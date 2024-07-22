import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useGetUserOrdersQuery } from "../app/services/orderApi";
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import OrdersDisplay from "../components/OrdersPage/OrderTable/OrdersDisplay";
import { queryStringToObject } from "../utils/urlParams";
import Pagination from "../components/Pagination/Pagination";

const OrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(+searchParams.get("page") || 1);
  const { data, isLoading, isFetching } = useGetUserOrdersQuery(
    `limit=3&page=${activePage}`
  );

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

    setActivePage(+searchParams.get("page"));
  }, [searchParams]);

  if (isLoading || isFetching) {
    return (
      <div className="profile-section">
        <h1 className="section-title">Orders</h1>
        <div className="flex-center" style={{ minHeight: "50px" }}>
          <BeatLoader color="#000" size={10} />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-section">
      <h1 className="section-title">Orders</h1>
      {data?.data?.length > 0 ? (
        <div className="display-data">
          <OrdersDisplay data={data?.data} />
          {data.count.numberOfPages > 1 && (
            <Pagination
              pagination={data.count}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          )}
        </div>
      ) : (
        <div className="flex-center" style={{ minHeight: "50px" }}>
          <h6 style={{ marginBottom: "0" }}>You have no orders</h6>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
