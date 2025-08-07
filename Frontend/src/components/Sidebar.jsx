// Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const baseClasses =
    "block text-left w-full px-2 py-2 rounded hover:bg-gray-700";

  return (
    <>
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Dashboard Home
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Add Products
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Orders Record
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
