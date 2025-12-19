import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import { assets } from "../../assets/assets";
import useCategory from "../../hooks/useCategory";
import useApp from "../../hooks/useApp";
import useProduct from "../../hooks/useProduct";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [stock, setStock] = useState("");
  const { categories } = useCategory();
  const { capitalizeWords, navigate } = useApp();
  const { createProductAdmin } = useProduct();

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit],
    content: "",
  });

  if (!editor) return null;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description: editor.getHTML(),
      category,
      oldPrice: price,
      newPrice: offerPrice,
      stock,
      image,
    };

    const result = await createProductAdmin(productData);
    if (result.success) {
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } else {
      toast.error(result.message || "Failed to create product");
    }
  };

  return (
    <div className="pb-6 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Product Image */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <label htmlFor="product-image" className="block mt-2">
            <input
              accept="image/*"
              type="file"
              id="product-image"
              hidden
              onChange={handleImageChange}
            />
            <img
              className="max-w-24 cursor-pointer border border-gray-300 rounded"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Area"
              width={100}
              height={100}
            />
          </label>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-300"
            required
          />
        </div>

        {/* Product Description (Tiptap) */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Product Description</label>
          <RichTextEditor
            editor={editor}
            className="border border-gray-300 rounded bg-white"
          >
            <RichTextEditor.Toolbar
              sticky
              stickyOffset="var(--docs-header-height)"
            >
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
          </RichTextEditor>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-300"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item._id}>
                {capitalizeWords(item.name)}
              </option>
            ))}
          </select>
        </div>

        {/* Price, Offer Price, Stock */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-300"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-300"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-300"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
