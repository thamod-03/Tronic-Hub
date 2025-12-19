import Category from "../models/Category.js";


const ensureDefaultCategory = async () => {
  try {
    let uncategorized = await Category.findOne({ name: "uncategorized" });

    if (!uncategorized) {
      uncategorized = new Category({
        name: "uncategorized",
      });
      await uncategorized.save();
      console.log("Default 'Uncategorized' category created");
    } else {
      console.log("'Uncategorized' category already exists");
    }
  } catch (error) {
    console.error("Error ensuring default category: ", error.message);
  }
};

export default ensureDefaultCategory;
