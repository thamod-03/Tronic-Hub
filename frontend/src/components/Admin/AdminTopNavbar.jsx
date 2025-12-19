import { NavLink } from "react-router";
import { assets } from "../../assets/assets";
import useAuth from "../../hooks/useAuth";

const AdminTopNavbar = () => {
    const {logout} = useAuth();

  return (
    <div className="flex items-center justify-between min-w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">
      <NavLink to="/">
        <img className="h-9" src={assets.logo} alt="Tronic Hub Logo" />
      </NavLink>
      <div className="flex items-center gap-5 text-gray-500">
        <p>Hi! Admin</p>
        <button onClick={logout} className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopNavbar;
