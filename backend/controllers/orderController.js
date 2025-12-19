import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// API to create order
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const { shippingAddress, type } = req.body;

    const orderItems = [];
    let totalPrice = 0;

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    if (cart.items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available stock: ${product.stock}`,
        });
      }

      const price = product.newPrice;

      totalPrice += price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalPrice,
      type,
    });

    await order.save();
    cart.items = [];
    await cart.save();

    return res.json({ success: true, order });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get user orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "items.product",
        select: "name category",
        populate: {
          path: "category",
          select: "name",
        },
      });

    if (!orders) {
      return res.json({ success: false, message: "No orders found" });
    }

    return res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all orders (Admin Only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate({
        path: "items.product",
        select: "name category",
        populate: {
          path: "category",
          select: "name",
        },
      }).sort({createdAt: -1});

    if (!orders) {
      return res.json({ success: false, message: "No orders found" });
    }
    res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to update order status (Admin Only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (status === "cancelled") {
      const items = order.items;
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    order.status = status;
    await order.save();

    return res.json({
      success: true,
      message: `Order status changed to ${status} successfully`,
      order,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get order by id (Admin Only)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name category")
      .populate("items.product.category", "name");

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, order });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to cancel the order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    order.status = "cancelled";

    const items = order.items;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await order.save();

    return res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get order stats (Admin Only)
export const getOrderStats = async (req, res) => {
  try {
    const statuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    const stats = {};
    for (const status of statuses) {
      stats[status] = await Order.countDocuments({ status });
    }
    const count = await Order.countDocuments();
    return res.json({ success: true, stats, count });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get revenue stats (Admin Only)
export const getRevenueStats = async (req, res) => {
  try {
    const validOrders = await Order.find({
      status: { $nin: ["cancelled", "pending"] },
    });

    const totalRevenue = validOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    const monthlyRevenue = await Order.aggregate([
      { $match: { status: { $nin: ["cancelled", "pending"] } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return res.json({ success: true, totalRevenue, monthlyRevenue });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
