
import { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";
import ProductCard from "./ProductCard";
import Loading from "./Loading";

const RelatedProducts = ({ category }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const {fetchRelatedProducts} = useProduct();

  useEffect(() => {
    const loadRelated = async () => {
      setLoading(true);
      const products = await fetchRelatedProducts(category);
      setRelated(products);
      setLoading(false);
    };
    if (category) loadRelated();
  }, [category]);

  const handleClick = () => {
    window.location.reload();
  }

  if (loading) return <Loading />;
  if (!related || related.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {related.map((p) => (
          <div onClick={handleClick} key={p._id}>
          <ProductCard key={p._id} product={p}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
