import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useProduct from "../../hooks/useProduct";
import EditProductForm from "../../components/Admin/EditProductForm";
import useApp from "../../hooks/useApp";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AdminProduct = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const { products, fetchProducts, pagination, deleteProductAdmin } =
    useProduct();
  const { navigate, capitalizeWords } = useApp();

  useEffect(() => {
    fetchProducts();
  }, [editingProduct, isDelete]);

  const handleDelete = async (id) => {
    setIsDelete(false);
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProductAdmin(id);
        if (res.success) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          setIsDelete(true);
        } else {
          Swal.fire("Error!", res.message, "error");
        }
      }
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <div className="flex justify-between mb-4 text-sm">
          <h1 className="pb-4 text-sm md:text-xl font-medium">All Products</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate("/admin/products/add-new")}
          >
            Add New Product
          </button>
        </div>

        {/* Table */}
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <div className="overflow-x-auto">
            <table className="md:table-auto table-fixed min-w-full scroll-auto">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">Product</th>
                  <th className="px-4 py-3 font-semibold truncate">Category</th>
                  <th className="px-4 py-3 font-semibold truncate hidden md:block">
                    Selling Price
                  </th>
                  <th className="px-4 py-3 font-semibold truncate">Stock</th>
                  <th className="px-4 py-3 font-semibold truncate">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {products.map((product, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt="Product"
                          className="w-16"
                        />
                      </div>
                      <span className="truncate max-sm:hidden w-full">
                        {product.name.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {capitalizeWords(product.category?.name)}
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">
                      LKR {product.newPrice}
                    </td>
                    <td className="px-4 py-3">
                      {product.stock === 0 ? (
                        <div className="bg-red-500 text-white px-3 py-1 rounded text-xs">
                          Out of Stock
                        </div>
                      ) : (
                        <span>{product.stock}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 my-6 text-sm">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => fetchProducts(pagination.currentPage - 1)}
              className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => fetchProducts(pagination.currentPage + 1)}
              className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingProduct(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <EditProductForm
                product={editingProduct}
                id={editingProduct._id}
                setEditingProduct={setEditingProduct}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;
