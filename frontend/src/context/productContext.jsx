import { createContext, useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductData,
  getProducts,
  getRelatedProducts,
  updateProduct,
} from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page = 1, selectedCategory, keyword) => {
    setLoading(true);
    const data = await getProducts(page, selectedCategory, keyword);
    if (data && data.success) {
      setProducts(data.products);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      });
    } else {
      setProducts([]);
      setPagination({currentPage: 0, totalPages: 0, totalProducts: 0})
    }
    setLoading(false);
  };

  const fetchProductById = async (id) => {
    setLoading(true);
    const product = await getProductById(id);
    setLoading(false);
    return product;
  };

  const fetchRelatedProducts = async (category) => {
    setLoading(true);
    const product = await getRelatedProducts(category);
    setLoading(false);
    return product;
  };

  const createProductAdmin = async (productData) => {
    const data = await createProduct(productData);
    return data;
  }

  const updateProductAdmin = async (id, productData) => {
    const data = await updateProduct(id, productData);
    return data;
  }

  const deleteProductAdmin = async (id) => {
    const data = await deleteProduct(id);
    return data;
  }

  const fetchProductStats = async () => {
    const data = await getProductData();
    return data;
  }

  const value = {
    products,
    pagination,
    selectedCategory,
    setSelectedCategory,
    setKeyword,
    loading,
    fetchProducts,
    fetchProductById,
    fetchRelatedProducts,
    createProductAdmin,
    updateProductAdmin,
    deleteProductAdmin,
    fetchProductStats
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
