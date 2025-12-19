import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#f3f3f3_25%,transparent_25%,transparent_75%,#f3f3f3_75%,#f3f3f3),linear-gradient(45deg,#f3f3f3_25%,transparent_25%,transparent_75%,#f3f3f3_75%,#f3f3f3)] bg-size[60px_60px] bg-position[0_0,30px_30px] -z-10"></div>

      <h1 className="text-8xl md:text-9xl font-bold text-blue-500">404</h1>
      <div className="h-1 w-16 rounded bg-blue-500 my-5 md:my-7"></div>

      <p className="text-2xl md:text-3xl font-bold text-gray-800">
        Page Not Found
      </p>

      <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <div className="flex items-center gap-4 mt-6">
        <Link
          to="/"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-7 py-2.5 text-white rounded-md active:scale-95 transition-transform"
        >
          <BiArrowBack />
          Return Home
        </Link>
        <Link
          to="/contact"
          className="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md hover:bg-gray-100 active:scale-95 transition-transform"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
