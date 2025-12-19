import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  oldPrice: { type: Number },
  newPrice: { type: Number, required: true },
  stock: { type: Number, required: true, default: 1 },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

productSchema.pre("save", async function () {
  if (!this.isModified("description")) return;

  this.description = sanitizeHtml(this.description, {
    allowedTags: ["p", "b", "i", "em", "strong", "ul", "li", "a"],
    allowedAttributes: { a: ["href", "target"] },
    allowedSchemes: ["http", "https", "mailto"],
  });
});

const Product = mongoose.model("Product", productSchema);

export default Product;
