import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  "/public/images/BannerDoces.png",
  "/public/images/BannerDança.png",
  "/public/images/BannerBaile.png",
];

export default function CarouselCard() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-16">
      <div className="border-b border-gray-200 mb-4 sm:mb-12"></div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
      >
        {banners.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full md:w-full h-[500px] md:h-[500px] object-contain rounded-3xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
