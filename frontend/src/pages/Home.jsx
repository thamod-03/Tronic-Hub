import { useEffect } from "react";
import HeroSectionSlider from "../components/HeroSectionSlider";
import NewestArrivalSlider from "../components/NewestArrivalSlider";
import useProduct from "../hooks/useProduct";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const { products, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col gap-4">
        <HeroSectionSlider />
      <NewestArrivalSlider products={products} />
      <Newsletter />
    </div>
  );
};

export default Home;
