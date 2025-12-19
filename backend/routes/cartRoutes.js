import express from 'express';
import { protect } from '../middleware/auth.js';
import { addToCart, clearCart, deleteFromCart, getCart, updateQuantity } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post("/add", protect, addToCart);
cartRouter.get("/", protect, getCart);
cartRouter.put("/update", protect, updateQuantity);
cartRouter.delete("/remove", protect, deleteFromCart);
cartRouter.delete("/clear", protect, clearCart);

export default cartRouter;