import { createContext, useEffect, useState } from "react";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderStats,
  getRevenueStats,
  getUserOrders,
  updateOrderStatus,
} from "../services/orderService";
import useAuth from "../hooks/useAuth";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserOrders = async () => {
    setLoading(true);
    if (user) {
      const data = await getUserOrders();
      setOrders(data);
    } else setOrders([]);
    setLoading(false);
  };

  const placeOrder = async (shippingAddress, type) => {
    const data = await createOrder(shippingAddress, type);
    if (data.success) {
      fetchUserOrders();
    }
    return data;
  };

  const cancelUserOrder = async (id) => {
    const data = await cancelOrder(id);
    if (data.success) {
      fetchUserOrders();
    }
    return data;
  };

  const fetchAllOrders = async () => {
    const data = await getAllOrders();
    return data;
  };

  const updateOrderStatusAdmin = async (id, status) => {
    const data = await updateOrderStatus(id, status);
    if (data.success) fetchAllOrders();
    return data;
  };

  const fetchOrderById = async (id) => {
    const data = await getOrderById(id);
    return data;
  };

  const fetchOrderStats = async () => {
    const data = await getOrderStats();
    return data;
  };

  const fetchRevenue = async () => {
    const data = await getRevenueStats();
    return data;
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  const value = {
    loading,
    orders,
    fetchUserOrders,
    placeOrder,
    cancelUserOrder,
    fetchAllOrders,
    fetchOrderById,
    updateOrderStatusAdmin,
    fetchOrderStats,
    fetchRevenue
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
