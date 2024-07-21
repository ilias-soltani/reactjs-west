import React, { useEffect, useState } from "react";
import ActiveImages from "../components/ProductPage/ActiveImages/ActiveImages";
import ActiveDetails from "../components/ProductPage/ActiveDetails/ActiveDetails";
import { useParams } from "react-router-dom";
import getColorImages from "../utils/getColorImages";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../app/services/productApi";
import { useGetColorByIdQuery } from "../app/services/colorApi";
import { SyncLoader } from "react-spinners";

const ProductPage = () => {
  const { "product-id": productId, "color-id": colorId } = useParams();

  const {
    data: productData,
    isLoading,
    isFetching: productDataFetching,
  } = useGetProductByIdQuery(productId);

  const {
    data: colorData,
    isLoading: colorIsLoading,
    isFetching: colorDataFetching,
  } = useGetColorByIdQuery(colorId);

  const {
    data: similarProductsData,
    isLoading: similarProductsIsLoading,
    isFetching: similarProductsFetching,
  } = useGetProductsQuery(
    `limit=3&series=${productData?.data?.series}&notProduct=${productData?.data?._id}&discount=0`
  );

  const {
    data: productsData,
    isLoading: productsDataIsLoading,
    isFetching: productsDataFetching,
  } = useGetProductsQuery(
    `limit=7&notProduct=${productData?.data?._id}&sale=true&category=657c9364f2c7789f94dc9a84`
  );

  const isFetching =
    productsDataFetching ||
    similarProductsFetching ||
    colorDataFetching ||
    productDataFetching;

  if (
    colorIsLoading ||
    isLoading ||
    similarProductsIsLoading ||
    productsDataIsLoading ||
    isFetching
  )
    return (
      <div className="app-section prodcut-page-loading">
        <div className="app-container">
          <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
        </div>
      </div>
    );

  const images = getColorImages(colorData?.data);

  return (
    <div className="app-section" style={{ opacity: isFetching ? 0.5 : 1 }}>
      <div className="product-page-container">
        <ActiveImages images={images} />
        <ActiveDetails
          product={productData?.data}
          color={colorData?.data}
          similarProducts={similarProductsData?.data}
        />
      </div>
      <div className="app-container">
        <h1 className="main-title">You may also like...</h1>
        <ProductCarousel swiperId={"swiper1"} products={productsData?.data} />
      </div>
    </div>
  );
};

export default ProductPage;
