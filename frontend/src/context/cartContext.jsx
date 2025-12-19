import { createContext, useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  deleteFromCart,
  getCart,
  updateQuantity,
} from "../services/cartService";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    setLoading(true);
    const data = await getCart();
    setCart(data || []);
    setLoading(false);
  };

  const addItem = async (productId, quantity) => {
    const success = await addToCart(productId, quantity);
    if (success) fetchCart();
    return success;
  };

  const updateItem = async (productId, quantity) => {
    const success = await updateQuantity(productId, quantity);
    if (success) fetchCart();
  };

  const removeItem = async (productId) => {
    const success = await deleteFromCart(productId);
    if (success) {
      toast.success("Item removed from cart")
      fetchCart()};
  };

  const clear = async () => {
    const success = await clearCart();
    if (success) {
      toast.success("Cart cleared successfully");
      fetchCart();
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
