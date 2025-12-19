import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import useApp from "../hooks/useApp";

const NewestArrivalSlider = ({ products }) => {
    const {navigate} = useApp()

  const newestProducts = products.slice(0, 18);

  const chunkedProducts = [];
  for (let i = 0; i < newestProducts.length; i += 6) {
    chunkedProducts.push(newestProducts.slice(i, i + 6));
  }

  chunkedProducts.push(newestProducts.slice(0, 6));

  return (
    <div className="w-[90vw] my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Newest Arrivals</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => navigate("/products")}>
          View More
        </button>
      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={true}
        className="w-full"
      >
        {chunkedProducts.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:grid-rows-1 gap-6">
              {group.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewestArrivalSlider;
