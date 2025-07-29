// client/src/shared/layout/dashboard/sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  headTeacherNavItems,
  schoolAdminNavItems,
  superAdminNavItems,
} from "../../../constants/sidebarMenu";
import EduSynxLogo from "../../edusynx-logo";

interface SidebarProps {
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const normalizedRole = role.toLowerCase().replace(/\s+/g, "-");

  const navMap: Record<string, typeof superAdminNavItems> = {
    "super-admin": superAdminNavItems,
    "headteacher": headTeacherNavItems,
    "school-admin": schoolAdminNavItems,
    // Add more roles here
  };

  const navItems = navMap[normalizedRole] || [];

  return (
    <aside className="fixed top-0 left-0 h-screen w-48 bg-white text-gray-900 shadow-lg overflow-visible z-50">
      <EduSynxLogo className="ml-8 text-[1rem]" />
      <nav className="mt-6">
        <ul>
          {navItems.map(({ name, icon: Icon, path, children }) => (
            <li key={name} className="group relative">
              <Link
                to={path || "#"}
                className={`flex items-center px-6 py-3 hover:bg-teal-200 transition ${
                  location.pathname === path ? "bg-gray-700 text-white" : ""
                }`}
              >
                <Icon className="mr-3" />
                {name}
              </Link>

              {children && (
                <ul className="absolute left-full top-0 ml-1 hidden w-64 bg-white text-gray-900 border rounded shadow-lg group-hover:block">
                  {children.map(
                    ({ name: childName, icon: ChildIcon, path: childPath }) => (
                      <li key={childName}>
                        <Link
                          to={childPath || "#"}
                          className={`flex items-center px-4 py-2 hover:bg-teal-100 transition ${
                            location.pathname === childPath
                              ? "bg-gray-700 text-white"
                              : ""
                          }`}
                        >
                          <ChildIcon className="mr-2" />
                          {childName}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
