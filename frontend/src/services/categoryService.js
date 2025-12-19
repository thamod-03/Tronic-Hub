import instance from "./authInstance";

export const getCategories = async () => {
  try {
    const { data } = await instance.get("/api/categories");
    if (data.success) return data.categories;
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createCategory = async (name) => {
  try {
    const { data } = await instance.post("/api/categories", { name });
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    return false;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const { data } = await instance.put(`/api/categories/${id}`, { name });
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    return false;
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await instance.delete(`/api/categories/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
};
