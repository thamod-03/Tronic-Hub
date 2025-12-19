import Category from "../models/Category.js";
import Product from "../models/Product.js";

// API to create category (AdminOnly)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ success: false, message: "No category name" });
    }

    const category = await Category.create({ name: name.toLowerCase() });

    return res.json({ success: true, category });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      return res.json({ success: false, message: "No categories found" });
    }

    return res.json({ success: true, categories });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to update category (Admin Only)
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    category.name = req.body.name?.toLowerCase() || category.name;

    await category.save();

    return res.json({ success: true, category });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to delete category (Admin Only)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    const uncategorized = await Category.findOne({ name: "uncategorized" });

    if(!uncategorized) {
        return res.json({success: false, message: "Uncategorized category not found"});
    }

    await Product.updateMany(
        {category}, {category: uncategorized._id}
    );

    await category.deleteOne();

    return res.json({ success: true, message: "Category deleted and products reassigned" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
