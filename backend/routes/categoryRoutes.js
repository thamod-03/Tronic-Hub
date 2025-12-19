import express from 'express';
import { adminOnly, protect } from '../middleware/auth.js';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", protect, adminOnly, createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.put("/:id", protect, adminOnly, updateCategory);
categoryRouter.delete("/:id", protect, adminOnly, deleteCategory);

export default categoryRouter;