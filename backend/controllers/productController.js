import cloudinary from "../config/cloudinary.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

// API to create a product (admin only)
export const createProduct = async (req, res) => {
  const { name, description, category, oldPrice, newPrice, stock } = req.body;
  const originalName = name.toLowerCase();

  try {
    const productExist = await Product.findOne({ name: originalName });
    const categoryExist = await Category.findById(category);

    if (productExist) {
      return res.json({ success: false, message: "Product already exists" });
    }

    if(!categoryExist) {
      return res.json({success: false, message: "Invalid category ID"});
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
      transformation: {
        width: 800,
        height: 800,
        crop: "limit",
      },
    });

    const product = await Product.create({
      name: originalName,
      description,
      category,
      oldPrice,
      newPrice,
      stock,
      imageUrl: result.secure_url,
    });

    return res.json({ success: true, product });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get products
export const getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * 20;
  const category = req.query.category;
  const keyword = req.query.keyword;

  const query = {};
  if (category) query.category = category;

  if (keyword) {
    const words = keyword.split(" ");
    query.$and = words.map((word) => ({
      $or: [
        { name: { $regex: word, $options: "i" } },
        { description: { $regex: word, $options: "i" } },
      ],
    }));
  }

  try {
    const products = await Product.find(query).skip(skip).limit(limit).sort({
      createdAt: -1,
    }).populate("category", "name");

    if (!products || products.length === 0) {
      return res.json({ success: false, message: "No products found" });
    }

    const totalProducts = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      category: category || "all",
      keyword: keyword || null,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, product });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// API to get related product
export const getRelatedProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const limit = 8;

    const products = await Product.find({ category })
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category", "name");

    if (!products || products.length === 0) {
      return res.json({ success: false, message: "No products found" });
    }

    return res.json({ success: true, products });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



// API to update product (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        transformation: {
          width: 800,
          height: 800,
          crop: "limit",
        },
      });

      product.imageUrl = result.secure_url;
    }

    product.name = req.body.name?.toLowerCase() || product.name;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.oldPrice = req.body.oldPrice ?? product.oldPrice;
    product.newPrice = req.body.newPrice ?? product.newPrice;
    product.stock = req.body.stock ?? product.stock;

    await product.save();

    return res.json({ success: true, product });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to delete product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    await product.deleteOne();
    return res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// API to get low stock products and product count (Admin Only)
export const getProductData = async (req, res) => {
  try {
    const products = await Product.find({stock: {$lte: 5}});
    const count = await Product.countDocuments();
    return res.json({success: true, products, count});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}