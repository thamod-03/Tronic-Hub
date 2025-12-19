import useApp from "../hooks/useApp";
import useProduct from "../hooks/useProduct";

const SearchBar = () => {
  const { keyword, setKeyword, navigate } = useApp();
  const { fetchProducts, selectedCategory, products } = useProduct();

  const handleSearch = (e) => {
    navigate("/products");
    fetchProducts(1, selectedCategory, keyword);
    console.log(products);
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center w-full border pl-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-md overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 30 30"
          fill="#6B7280"
        >
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input
          type="text"
          placeholder="Search for products"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
        />
      </div>
      <button
        onClick={() => handleSearch()}
        className="bg-blue-500 w-32 h-[46px] rounded-md text-sm text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
