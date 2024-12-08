"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
];

// components/Carousel.tsx
const Carousel = () => {
  return (
    <div className="w-full h-48 bg-purple-200 flex items-center justify-center rounded-lg">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {colors.map((color, index) => (
          <SwiperSlide key={index}>
            <div
              className={`w-full h-full ${color} flex items-center justify-center text-white text-2xl font-bold`}
            >
              Slide {index + 1}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
