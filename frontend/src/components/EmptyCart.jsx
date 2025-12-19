import { BsCartX } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-6">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#f3f3f3_25%,transparent_25%,transparent_75%,#f3f3f3_75%,#f3f3f3),linear-gradient(45deg,#f3f3f3_25%,transparent_25%,transparent_75%,#f3f3f3_75%,#f3f3f3)] bg-size[60px_60px] bg-position[0_0,30px_30px] -z-10"></div>

      <div className="flex flex-col items-center text-center max-w-md">
        <div className="text-[120px] text-gray-300 mb-6 animate-bounce">
          <BsCartX aria-hidden="true" />
        </div>

        <h1
          className="text-3xl font-semibold mb-4"
          aria-label="Empty Shopping Cart"
        >
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 max-w-sm mb-6">
          Looks like you haven't added anything to your cart yet. Explore our
          products and find something you love!
        </p>

        <Link
          to="/products"
          aria-label="Return to Shop"
          role="button"
          className="flex items-center gap-2 px-6 py-3 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          <BiArrowBack />
          Return to Shop
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
