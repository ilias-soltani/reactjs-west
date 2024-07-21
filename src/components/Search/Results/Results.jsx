import React, { useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import { motion } from "framer-motion";
import Pagination from "../../Pagination/Pagination";

import "./Results.scss";

const Results = ({
  products,
  pagination,
  activePage,
  setActivePage,
  isLoading,
}) => {
  return (
    <div className="search-results">
      <div
        className="results-container"
        style={{ opacity: isLoading ? "0.5" : "1" }}
      >
        {products.map((product, i) => (
          <motion.div
            initial={{ translateY: 25, opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: (((i + 1 - 1) % 4) + 1) * 0.05,
            }}
            viewport={{
              once: true,
            }}
            key={product._id + i}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
      {pagination.numberOfPages > 1 && (
        <Pagination
          pagination={pagination}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
};

export default Results;
