import instance from "./authInstance";

export const createOrder = async (shippingAddress, type) => {
  try {
    const { data } = await instance.post("/api/orders", {
      shippingAddress,
      type,
    });
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, message: error.message };
  }
};

export const getUserOrders = async () => {
  try {
    const { data } = await instance.get("/api/orders/myorders");
    if (data.success) return data.orders;
    else return [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const cancelOrder = async (id) => {
  try {
    const { data } = await instance.put(`/api/orders/${id}`);
    return data;
  } catch (error) {
    console.error("Error cancelling order:", error);
    return { success: false, message: error.message };
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await instance.get("/api/orders");
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, message: error.message };
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const { data } = await instance.put(`/api/orders/${id}/status`, { status });
    return data;
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, message: error.message };
  }
};

export const getOrderById = async (id) => {
  try {
    const { data } = await instance.get(`/api/orders/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, message: error.message };
  }
};

export const getOrderStats = async () => {
  try {
    const { data } = await instance.get("/api/orders/stats");
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, message: error.message };
  }
};

export const getRevenueStats = async () => {
  try {
    const { data } = await instance.get("/api/orders/revenue");
    return data;
  } catch (error) {
    console.error("Error fetching revenue:", error);
    return { success: false, message: error.message };
  }
};
