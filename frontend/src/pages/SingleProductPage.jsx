import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../hooks/useProduct";
import useApp from "../hooks/useApp";
import RelatedProducts from "../components/RelatedProducts";
import useCart from "../hooks/useCart";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const SingleProductPage = () => {
  const { id } = useParams();
  const { fetchProductById, fetchRelatedProducts } = useProduct();
  const { capitalizeWords } = useApp();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id, fetchProductById]);

  if (!product) return <Loading />;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddItem = async (productId, quantity) => {
    const success = await addItem(productId, quantity);
    if (success) toast.success("Item added to cart");
    else toast.error("Error: Item can't added to cart");
  };

  return (
    <div className="flex justify-center items-center m-12">
      <div className="max-w-6xl w-full px-6">
        {/* Breadcrumb */}
        <p>
          <span>Home</span> /<span> Products</span> /
          <span>
            {" "}
            {capitalizeWords(product.category?.name) ||
              capitalizeWords(product.category)}
          </span>{" "}
          /<span className="text-blue-500"> {product.name.toUpperCase()}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          {/* Product Image */}
          <div className="border border-gray-500/30 max-w-md rounded overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">
              {product.name.toUpperCase()}
            </h1>

            {/* Price */}
            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: LKR {product.oldPrice}
              </p>
              <p className="text-2xl font-medium">
                Price: LKR {product.newPrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            {/* About Product */}
            <p className="text-base font-medium mt-6">About Product</p>
            <div
              className="text-gray-500/70"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Quantity Selector */}
            {product.stock !== 0 ? (
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <span className="text-sm text-gray-500">
                  Stock: {product.stock}
                </span>
              </div>
            ) : (
              <div className="mt-6 text-white bg-red-500 w-3/14 text-center py-2 rounded-2xl font-semibold">
                Out of Stock
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex items-center mt-10 text-base">
              <button
                disabled={product.stock === 0}
                id={product._id}
                onClick={() => handleAddItem(product._id, quantity)}
                className="disabled:opacity-50 disabled:hover:bg-blue-500 disabled:cursor-default w-full py-3.5 cursor-pointer font-medium bg-blue-500 text-white over:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <RelatedProducts
            category={product.category?._id || product.category}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
