import instance from "./authInstance";

export const getCart = async () => {
  try {
    const { data } = await instance.get("/api/cart");
    if (data.success) return data.cart;
    return [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const { data } = await instance.post("/api/cart/add", {
      productId,
      quantity,
    });
    return data.success;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const updateQuantity = async (productId, quantity) => {
  try {
    const { data } = await instance.put("/api/cart/update", {
      productId,
      quantity,
    });
    if (data.success) return data.success;
    return false;
  } catch (error) {
    console.error("Error updating cart item:", error);
    return false;
  }
};

export const deleteFromCart = async (productId) => {
  try {
    const { data } = await instance.delete("/api/cart/remove", {data:{ productId }});
    if (data.success) return data.success;
    console.log(data)
    return false;
  } catch (error) {
    console.error("Error removing cart item:", error);
    return false;
  }
};

export const clearCart = async () => {
  try {
    const { data } = await instance.delete("api/cart/clear");
    if (data.success) return data.success;
    console.log("Error clearing cart");
  } catch (error) {
    console.error("Error clearing cart:", error);
    return false;
  }
};
