import { useContext } from "react";
import { OrderContext } from "../context/orderContext";

const useOrder = () => {
  return useContext(OrderContext);
};

export default useOrder;
