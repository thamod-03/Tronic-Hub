// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import useApp from "../hooks/useApp";

export default function ProductCard({ product }) {
  return (
    <div className="rounded-lg text-card-foreground shadow-sm group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm p-2">
      <div className="p-2">
        {/* Product Image */}
        <Link to={`/products/product/${product.slug || product._id}`}>
          <div
            className="aspect-square bg-linear-to-br from-slate-100 to-slate-200 rounded-lg mb-1 flex items-center justify-center overflow-hidden cursor-pointer"
            style={{ minHeight: "120px", maxHeight: "325px" }}
          >
            <img
              alt={product.name}
              loading="lazy"
              width="300"
              height="300"
              decoding="async"
              className="object-contain group-hover:scale-110 transition-transform duration-300"
              src={product.imageUrl}
              style={{ color: "transparent" }}
            />
          </div>
        </Link>

        {product.category && (
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-700 hover:bg-indigo-200 mb-1 text-xs">
            {typeof product.category === "object"
              ? product.category.name.toUpperCase()
              : product.category.toUpperCase()}
          </div>
        )}

        <Link to={`/products/product/${product.slug || product._id}`}>
          <h3 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
            {product.name.toUpperCase()}
          </h3>
        </Link>

        <div
          className="text-slate-600 mb-2 line-clamp-2 text-xs"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            LKR {product.newPrice?.toFixed(2)}
          </span>
          {product.stock === 0 && <div className="text-white bg-red-500 px-2 rounded-sm">Out of Stock</div>}
        </div>
      </div>
    </div>
  );
}
