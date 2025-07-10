// src/shared/layout/dashboard/sidebar.tsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  headTeacherNavItems,
  superAdminNavItems,

  // teacherNavItems,
  // accountantNavItems,
  // guardianNavItems,
} from "../../../constants/sidebarMenu";
import useUserAuth from "../../../hooks/useUserAuth";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { savedUser: user } = useUserAuth();
  const role = user?.role || "";

  // Role-based nav item map
  const navMap: Record<string, typeof superAdminNavItems> = {
    "super-admin": superAdminNavItems,
    headteacher: headTeacherNavItems,
    // "school-admin": schoolAdminNavItems,
    // "teacher": teacherNavItems,
    // "accountant": accountantNavItems,
    // "guardian": guardianNavItems,
  };

  const navItems = navMap[role] || [];

  return (
    <aside className="fixed top-0 left-0 h-screen w-48 bg-white text-gray-900 shadow-lg overflow-y-auto z-50">
      <div className="text-xl font-bold px-6 py-5 border-b border-gray-700">
        EduSynx {role ? role.replace(/-/g, " ").toUpperCase() : ""}
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map(({ name, icon: Icon, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`flex items-center px-6 py-3 hover:bg-gray-700 transition ${
                  location.pathname === path ? "bg-gray-700 text-white" : ""
                }`}
              >
                <Icon className="mr-3" />
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
