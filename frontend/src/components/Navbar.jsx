import { useState } from "react";
import { assets } from "../assets/assets";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useApp from "../hooks/useApp";
import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProduct";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useAuth();
  const { navigate, keyword, setKeyword } = useApp();
  const { fetchProducts, selectedCategory } = useProduct();
  const { cart } = useCart();

  const length = cart?.items?.length || 0;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
      fetchProducts(1, selectedCategory, keyword);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white relative transition-all">
      <NavLink to="/">
        <img src={assets.logo} alt="Logo" className="h-10" />
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/products" className="text-gray-700 hover:text-blue-600">
          Products
        </NavLink>
        <NavLink to="/about" className="text-gray-700 hover:text-blue-600">
          About
        </NavLink>
        <NavLink to="/contact" className="text-gray-700 hover:text-blue-600">
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
          <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
        </div>

        {user && (
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img src={assets.nav_cart_icon} alt="Cart" className="w-6 h-6" />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-blue-500 w-[22px] h-[22px] rounded-full">
              {length}
            </button>
          </div>
        )}

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-8 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div
            className="relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-8 h-8 cursor-pointer rounded-full border border-gray-300"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                {!user.isVerified && (
                  <NavLink
                    to="/verify"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Verify Email
                  </NavLink>
                )}
                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                )}
                <NavLink
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </NavLink>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4 sm:hidden">
        {/* Search Icon */}
        <button onClick={() => setShowSearch(!showSearch)}>
          <img src={assets.search_icon} alt="Search" className="w-6 h-6" />
        </button>

        {/* Menu Icon */}
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
        </button>
      </div>

      {showSearch && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md p-4 z-50">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
      >
        <NavLink
          to="/products"
          className="block text-gray-700 hover:text-blue-600"
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className="block text-gray-700 hover:text-blue-600"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="block text-gray-700 hover:text-blue-600"
        >
          Contact
        </NavLink>

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-6 py-2 mt-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <div>
            <div className="flex flex-col gap-2">
              {!user.isVerified && (
                <NavLink
                  to="/verify"
                  className="block text-sm text-gray-700 hover:text-blue-600"
                >
                  Verify Email
                </NavLink>
              )}
              <NavLink
                to="/cart"
                className="block text-sm text-gray-700 hover:text-blue-600"
              >
                Cart
              </NavLink>
              <NavLink
                to="/orders"
                className="block text-sm text-gray-700 hover:text-blue-600"
              >
                My Orders
              </NavLink>
              <button
                onClick={logout}
                className="cursor-pointer mt-2 px-8 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
