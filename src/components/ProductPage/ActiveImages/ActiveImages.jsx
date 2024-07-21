import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import useScreenSize from "../../../hooks/Screen/useScreenSize.js";

import "./ActiveImages.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const ActiveImages = ({ images }) => {
  const screenSize = useScreenSize();
  if (screenSize === "small") {
    return (
      <div className="images-swiper-cont">
        <Swiper
          slidesPerView={1.3}
          spaceBetween={24}
          centeredSlides={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {images.map((imgSrc, i) => (
            <SwiperSlide key={i}>
              <div className="active-color-image-swiper">
                <img src={imgSrc} alt={`image-${i}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else {
    return (
      <div className="avtive-color-images color-images-container">
        {images.map((imgSrc, i) => (
          <div className="active-color-image" key={i}>
            <img src={imgSrc} alt={`image-${i}`} />
          </div>
        ))}
      </div>
    );
  }
};

export default ActiveImages;
