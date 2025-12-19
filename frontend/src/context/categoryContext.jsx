import { createContext, useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categoryService";
import useApp from "../hooks/useApp";
import { toast } from "react-toastify";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const { capitalizeWords } = useApp();

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const createCategoryAdmin = async (name) => {
    const data = await createCategory(name);
    if (data.success) {
      toast.success(`${capitalizeWords(name)} category created successfully`);
      fetchCategories();
    } else {
      toast.error(data.message);
    }
  };

  const updateCategoryAdmin = async (id, name) => {
    const data = await updateCategory(id, name);
    if (data.success) {
      toast.success("Category updated successfully");
      fetchCategories();
    } else {
      toast.error(data.message);
    }
  };

  const deleteCategoryAdmin = async (id) => {
    const data = await deleteCategory(id);
    if (data.success) {
      toast.success(data.message);
      fetchCategories();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value = {
    categories,
    createCategoryAdmin,
    updateCategoryAdmin,
    deleteCategoryAdmin,
  };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
