// src/shared/layout/dashboard/sidebar.tsx

import React from "react";
import { FaTachometerAlt, FaUser, FaCog, FaSchool, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Schools", icon: <FaSchool />, path: "/dashboard/schools" },
  { name: "Users", icon: <FaUser />, path: "/dashboard/users" },
  { name: "Settings", icon: <FaCog />, path: "/dashboard/settings" },
  { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
 <aside className="fixed top-0 left-0 h-screen w-48 bg-white text-gray-900 shadow-lg overflow-y-auto z-50">

      <div className="text-xl font-bold px-6 py-5 border-b border-gray-700">
        EduSynx Admin
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map(({ name, icon, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`flex items-center px-6 py-3 hover:bg-gray-700 transition ${
                  location.pathname === path ? "bg-gray-700" : ""
                }`}
              >
                <span className="mr-3">{icon}</span>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
