import instance from "./authInstance";

export const getProducts = async (page = 1, category = "", keyword = "") => {
  try {
    const { data } = await instance.get("/api/products", {
      params: { page, category, keyword },
    });
    if (data.success) return data;
    return false;
  } catch (error) {
    console.error("Error fetching products:", error);
    return false;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await instance.get(`/api/products/${id}`);
    if (data.success) return data.product;
    return false;
  } catch (error) {
    console.error("Error fetching products:", error);
    return false;
  }
};

export const getRelatedProducts = async (category) => {
  try {
    const { data } = await instance.get("/api/products/related", {
      params: { category },
    });
    if (data.success) return data.products;
    return [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("oldPrice", productData.oldPrice);
    formData.append("newPrice", productData.newPrice);
    formData.append("stock", productData.stock);

    if (productData.image) {
      formData.append("image", productData.image);
    }

    const { data } = await instance.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, message: error.message };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("oldPrice", productData.oldPrice);
    formData.append("newPrice", productData.newPrice);
    formData.append("stock", productData.stock);

    if (productData.image) {
      formData.append("image", productData.image);
    }

    const { data } = await instance.put(`/api/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: error.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await instance.delete(`/api/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: error.message };
  }
};

export const getProductData = async () => {
  try {
    const { data } = await instance.get("/api/products/stats");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: error.message };
  }
};
