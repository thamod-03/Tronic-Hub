import { useState } from "react";
import useCategory from "../../hooks/useCategory";

const AddCategoryForm = ({ onClose }) => {
  const { createCategoryAdmin } = useCategory();
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;
    await createCategoryAdmin(name);
    setName("");
    onClose();
  };

  return (
    <div className="p-4 border rounded bg-gray-50">
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      />
      <button
      disabled={name.trim().length == 0}
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500"
      >
        Add
      </button>
    </div>
  );
};

export default AddCategoryForm;
