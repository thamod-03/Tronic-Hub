import express from "express";
import { adminOnly, protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductData,
  getProducts,
  getRelatedProducts,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createProduct
);
productRouter.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateProduct
);

productRouter.get("/stats", protect, adminOnly, getProductData);
productRouter.delete("/:id", protect, adminOnly, deleteProduct);
productRouter.get("/", getProducts);
productRouter.get("/related", getRelatedProducts);
productRouter.get("/:id", getProductById);

export default productRouter;
