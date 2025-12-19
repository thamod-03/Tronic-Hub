import express from "express";
import { adminOnly, protect } from "../middleware/auth.js";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderStats,
  getRevenueStats,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", protect, createOrder);
orderRouter.get("/myorders", protect, getUserOrders);
orderRouter.get("/", protect, adminOnly, getAllOrders);
orderRouter.get("/stats", protect, adminOnly, getOrderStats);
orderRouter.get("/revenue", protect, adminOnly, getRevenueStats);
orderRouter.get("/:id", protect, adminOnly, getOrderById);
orderRouter.put("/:id/status", protect, adminOnly, updateOrderStatus);
orderRouter.put("/:id", protect, cancelOrder);

export default orderRouter;
