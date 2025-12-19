import { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import useCategory from "../hooks/useCategory";
import useApp from "../hooks/useApp";
import Loading from "../components/Loading";
import ProductNotFound from "../components/ProductNotFound";

const Products = () => {
  const { fetchProducts, products, loading, pagination, setSelectedCategory, selectedCategory } = useProduct();
  const { capitalizeWords, keyword } = useApp();
  const { categories } = useCategory();

  useEffect(() => {
    fetchProducts(1, keyword, selectedCategory);
  }, [selectedCategory]);

  if (loading) return <Loading />;

  if(products.length === 0) return <ProductNotFound query={keyword}/>

  return (
    <div className="px-6">
      <div className="flex justify-end items-center gap-4 mt-4 mr-4 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => {
            const newCategory = e.target.value;
            setSelectedCategory(newCategory);
            console.log(newCategory)
            fetchProducts(1, newCategory); 
          }}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {capitalizeWords(cat.name)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6 mb-14">
        <button
          disabled={pagination.currentPage === 1}
          onClick={() =>
            fetchProducts(pagination.currentPage - 1, selectedCategory)
          }
          className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-sm">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() =>
            fetchProducts(pagination.currentPage + 1, selectedCategory)
          }
          className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
