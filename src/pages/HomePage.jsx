import React from "react";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import CollectionBanner from "../components/CollectionBanner/CollectionBanner";
import CollectionsCarousel from "../components/CollectionsCarousel/CollectionsCarousel";
import { SyncLoader } from "react-spinners";
import { useGetProductsQuery } from "../app/services/productApi";
import { useGetCollectionsQuery } from "../app/services/collectionApi";

const HomePage = () => {
  const { data: saleProducts, isLoading } = useGetProductsQuery(
    "limit=15&category=657c9364f2c7789f94dc9a84&sale=true"
  );

  const { data: collections, isLoading: collectionLoading } =
    useGetCollectionsQuery();

  const { data: polarProducts, isLoading: polarLoading } = useGetProductsQuery(
    "limit=15&series=668e883c7f218330f8add427"
  );

  const { data: classicProducts, isLoading: classicLoading } =
    useGetProductsQuery("limit=15&series=668e87e0df225fe8118be683");

  const firstTwoCollections = collections?.data.slice(0, 2);
  const remainingCollections = collections?.data.slice(2);

  const appLoading =
    isLoading || collectionLoading || polarLoading || polarLoading;

  return (
    <div>
      <HeroSection />
      {appLoading ? (
        <div className="flex-center" style={{ minHeight: "100vh" }}>
          <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
        </div>
      ) : (
        <>
          <div className="app-container">
            <ProductCarousel
              swiperId={"swiper1"}
              products={saleProducts?.data}
              isLoading={isLoading}
            />
          </div>
          {firstTwoCollections?.map((collection, i) => (
            <div key={collection._id}>
              <CollectionBanner collection={collection} />
              <div className="app-container">
                <ProductCarousel
                  swiperId={`swiper${i + 2}`}
                  products={
                    i === 0 ? polarProducts?.data : classicProducts?.data
                  }
                  isLoading={i === 0 ? polarLoading : classicLoading}
                />
              </div>
            </div>
          ))}
          {!collectionLoading && (
            <CollectionsCarousel data={remainingCollections} />
          )}
          <div className="app-container">
            <ProductCarousel
              swiperId={"swiper4"}
              products={saleProducts?.data}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
