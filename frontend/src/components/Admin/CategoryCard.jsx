import { useState } from "react";
import Swal from "sweetalert2";
import useCategory from "../../hooks/useCategory";
import useApp from "../../hooks/useApp";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CategoryCard = ({ category }) => {
  const { updateCategoryAdmin, deleteCategoryAdmin } = useCategory();
  const { capitalizeWords } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);

  const handleUpdate = async () => {
    await updateCategoryAdmin(category._id, name);
    setEditing(false);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this category will reassign its products to 'uncategorized'.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we remove the category.",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        await deleteCategoryAdmin(category._id);

        Swal.close();
      }
    });
  };

  return (
    <tr className="border-t border-gray-500/20">
      <td className="px-4 py-3 truncate">
        {editing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <span>{capitalizeWords(category.name)}</span>
        )}
      </td>
      <td className="px-4 py-3 flex gap-2">
        {editing ? (
          <>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setName(category.name);
              }}
              className="px-3 py-1 bg-gray-200 rounded text-xs hover:bg-gray-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              <FaRegEdit />
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              <MdDelete />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default CategoryCard;
