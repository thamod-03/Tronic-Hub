import { useContext } from "react";
import { ProductContext } from "../context/productContext";

const useProduct = () => {
  return useContext(ProductContext);
};

export default useProduct;
