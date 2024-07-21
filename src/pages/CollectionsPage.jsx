import React, { useState } from "react";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import CollectionBanner from "../components/CollectionBanner/CollectionBanner";
import { useGetCollectionsWithProductsQuery } from "../app/services/collectionApi";
import { SyncLoader } from "react-spinners";

const CollectionsPage = () => {
  const { data, isLoading } = useGetCollectionsWithProductsQuery();

  if (isLoading)
    return (
      <div className="collections-page-loading">
        <div className="app-container">
          <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
        </div>
      </div>
    );

  return (
    <div className="collections-page">
      {data?.data.map((collection, i) => (
        <div key={i}>
          <CollectionBanner collection={collection} />
          <div className="app-container">
            <ProductCarousel
              swiperId={`swiper${i}`}
              products={collection.products}
              isLoading={isLoading}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionsPage;
