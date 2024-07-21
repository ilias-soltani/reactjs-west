import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useScreenSize from "../../hooks/Screen/useScreenSize.js";
import { motion } from "framer-motion";
import getSlidesPerView from "../../utils/getSlidesPerView.js";
import useSwiperNavigation from "../../hooks/ProductCarousel/useSwiperNavigation .js";
import { SyncLoader } from "react-spinners";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./ProductCarousel.scss";

const ProductCarousel = ({ swiperId, products, isLoading }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { isBeginning, isEnd } = useSwiperNavigation(swiperInstance);
  const [swiperHover, setSwiperHover] = useState(false);
  const screenSize = useScreenSize();

  const currentWidth = window.innerWidth;
  const slides = getSlidesPerView(currentWidth);

  if (isLoading)
    return (
      <div className="swiper-container-loading">
        <SyncLoader size={15} speedMultiplier={0.9} color="#808080" />
      </div>
    );

  return (
    <div className="swiper-container">
      <div
        className="swiper-cont"
        onMouseEnter={() => setSwiperHover(true)}
        onMouseLeave={() => setSwiperHover(false)}
      >
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={1}
          spaceBetween={24}
          freeMode={screenSize === "small" ? true : false}
          navigation={{
            nextEl: `.${swiperId}-button-next`,
            prevEl: `.${swiperId}-button-prev`,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            400: {
              slidesPerView: 2.2,
            },
            767: {
              slidesPerView: 3.2,
            },
            992: {
              slidesPerView: 4.2,
            },
            1200: {
              slidesPerView: 6.2,
            },
          }}
          modules={[Pagination, Navigation, FreeMode]}
          className="mySwiper"
        >
          {products &&
            products.length > 1 &&
            products.map((item, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={
                    i + 1 <= slides ? { translateY: 25, opacity: 0 } : {}
                  }
                  whileInView={
                    i + 1 <= slides ? { translateY: 0, opacity: 1 } : {}
                  }
                  transition={
                    i + 1 <= slides ? { duration: 0.3, delay: i * 0.05 } : {}
                  }
                  viewport={{
                    once: true,
                  }}
                >
                  <ProductCard product={item} />
                </motion.div>
              </SwiperSlide>
            ))}
        </Swiper>

        <div
          className={`flex-center ${swiperId}-button-prev prev ${
            swiperHover && !isBeginning ? "show" : ""
          }`}
        >
          <IoIosArrowBack onClick={() => {}} />
        </div>

        <div
          className={`flex-center ${swiperId}-button-next next ${
            swiperHover && !isEnd ? "show" : ""
          }`}
        >
          <IoIosArrowForward onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
