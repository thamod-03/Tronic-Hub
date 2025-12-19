import { useState } from "react";
import CategoryCard from "../../components/Admin/CategoryCard";
import AddCategoryForm from "../../components/Admin/AddCategoryForm";
import useCategory from "../../hooks/useCategory";

const AdminCategories = () => {
  const { categories } = useCategory();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const perPage = 10;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 gap-10">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Category
        </button>
      </div>

      {showForm && <AddCategoryForm onClose={() => setShowForm(false)} />}

      <table className="min-w-full divide-y scroll-auto">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
        <tbody>
          {paginated.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
