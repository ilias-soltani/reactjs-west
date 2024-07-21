import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./CollectionBanner.scss";

const CollectionBanner = ({ collection }) => {
  return (
    <div className="collection-banner">
      <img
        className="banner-img"
        src={collection.image}
        alt={collection.name}
      />

      <div className="content">
        <motion.h2
          initial={{ translateY: 25, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{
            once: true,
          }}
        >
          {collection.display}
        </motion.h2>

        <Link to={`/collections/${collection._id}`}>
          <IoIosArrowRoundForward />
          Shop Here
        </Link>
      </div>
    </div>
  );
};

export default CollectionBanner;
