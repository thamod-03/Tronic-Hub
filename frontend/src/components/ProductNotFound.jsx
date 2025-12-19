import { BiSearchAlt2 } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";

const ProductNotFound = ({ query }) => {
  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-6">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#f3f3f3_25%,transparent_25%,transparent_75%,#f3f3f3_75%,#f3f3f3),linear-gradient(45deg,#f3f3f3_25%,transparent_25%,transparent_75%,#f3f3f3_75%,#f3f3f3)] bg-size[60px_60px] bg-position[0_0,30px_30px] -z-10"></div>

      <div className="flex flex-col items-center text-center max-w-md">
        <div className="text-[120px] text-gray-300 mb-6 animate-bounce">
          <BiSearchAlt2 aria-hidden="true" />
        </div>

        <h1
          className="text-3xl font-semibold mb-4"
          aria-label="Product Not Found"
        >
          No Products Found
        </h1>

        <p className="text-gray-500 max-w-sm mb-6">
          {query ? (
            <>
              We couldn't find any results for{" "}
              <span className="font-medium">"{query}"</span>. Try browsing our
              catalog instead!
            </>
          ) : (
            <>
              Looks like we couldn't find what you're searching for. Browse our
              products and discover more!
            </>
          )}
        </p>

        <button
          aria-label="Return to Shop"
          role="button"
          className="flex items-center gap-2 px-6 py-3 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-transform transform hover:scale-105"
          onClick={() => {
            window.location.reload();
          }}
        >
          <BiArrowBack />
          Browse Products
        </button>
      </div>
    </div>
  );
};

export default ProductNotFound;
