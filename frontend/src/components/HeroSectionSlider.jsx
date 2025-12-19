import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const HeroSectionSlider = () => {
  const slides = [
    {
      id: 1,
      alt: "Hero Banner 1",
      sources: {
        mobile: `${assets.hero1_sm}`,
        tablet: `${assets.hero1_md}`,
        desktop: `${assets.hero1_lg}`,
        fallback: `${assets.hero1_lg}`,
      },
    },
    {
      id: 2,
      alt: "Hero Banner 2",
      sources: {
        mobile: `${assets.hero2_sm}`,
        tablet: `${assets.hero2_md}`,
        desktop: `${assets.hero2_lg}`,
        fallback: `${assets.hero2_lg}`,
      },
    },
    {
      id: 3,
      alt: "Hero Banner 3",
      sources: {
        mobile: `${assets.hero3_sm}`,
        tablet: `${assets.hero3_md}`,
        desktop: `${assets.hero3_lg}`,
        fallback: `${assets.hero3_lg}`,
      },
    },
  ];

  return (
    <div className="w-screen h-[30vh] sm:h-[60vh] md:h-[80vh] lg:w-[90vw] relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Responsive Image */}
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={slide.sources.mobile}
                  type="image/webp"
                />
                <source
                  media="(max-width: 1366px)"
                  srcSet={slide.sources.tablet}
                  type="image/webp"
                />
                <source
                  media="(min-width: 1367px)"
                  srcSet={slide.sources.desktop}
                  type="image/webp"
                />
                <img
                  src={slide.sources.fallback}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </picture>

              {/* CTA Button */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <motion.button whileHover={{ scale: 1.2 }}>
                  <Link
                    to="/products"
                    className="px-6 py-3 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    Shop Now
                  </Link>
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSectionSlider;
