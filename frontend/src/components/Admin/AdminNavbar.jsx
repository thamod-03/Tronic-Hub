import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

const AdminNavbar = () => {
    const [selectedOption, setSelectedOption] = useState("Dashboard");
    const location = useLocation().pathname;

  

  const dashboardIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h7V3H3v9zm0 9h7v-7H3v7zm11 0h7v-7h-7v7zm0-9h7V3h-7v9z"
      />
    </svg>
  );

  const productsIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V7a2 2 0 0 0-2-2h-4V3H10v2H6a2 2 0 0 0-2 2v6m16 0v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6m16 0H4"
      />
    </svg>
  );

  const categoriesIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const ordersIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17v-6h13v6H9zm0 0H6a2 2 0 0 1-2-2V7h5v10z"
      />
    </svg>
  );

  const sidebarLinks = [
    { name: "Dashboard", path: "/admin", icon: dashboardIcon },
    { name: "Products", path: "/admin/products", icon: productsIcon },
    { name: "Categories", path: "/admin/categories", icon: categoriesIcon },
    { name: "Orders", path: "/admin/orders", icon: ordersIcon },
  ];

  useEffect(() => {
    sidebarLinks.map(link => {
      if(location.includes(link.path)) setSelectedOption(link.name)
    })
  }, [])

  return (
    <>
      <div className="md:w-64 w-20 border-r h-screen text-base border-gray-300 pt-4 flex flex-col bg-white">
        {sidebarLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            onClick={() => setSelectedOption(item.name)}
            className={`flex items-center py-3 px-4 gap-3 transition
              ${
                selectedOption === item.name
                  ? "border-r-4 md:border-r-[6px] bg-blue-500/10 border-blue-500 text-blue-500"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            {item.icon}
            <p className="md:block hidden">{item.name}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default AdminNavbar;
