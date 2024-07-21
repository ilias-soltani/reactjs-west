import React from "react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MotionComponent from "../../components/MotionComponent/MotionComponent";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CollectionsCarousel.scss";

const CollectionsCarousel = ({ data }) => {
  return (
    <div className="collections-carousel">
      <div id="containerForBullets"></div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        pagination={{
          el: "#containerForBullets",
          type: "bullets",
          bulletClass: "swiper-custom-bullet",
          bulletActiveClass: "swiper-custom-bullet-active",
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {data?.map((item, i) => (
          <SwiperSlide key={item._id}>
            <div className="collection-card">
              <img src={item.image} alt={item.name} />
              <div className="app-container content">
                <motion.h2
                  initial={{ translateY: 25, opacity: 0 }}
                  whileInView={{ translateY: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{
                    once: true,
                  }}
                >
                  {item.display}
                </motion.h2>
                <MotionComponent
                  as={Link}
                  to={`/collections/${item._id}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{
                    once: true,
                  }}
                >
                  <IoIosArrowRoundForward />
                  View All
                </MotionComponent>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CollectionsCarousel;
