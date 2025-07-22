// client/src/shared/layout/dashboard/sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  headTeacherNavItems,
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
    // Add more roles here
  };

  const navItems = navMap[normalizedRole] || [];

  return (
    <aside className="fixed top-0 left-0 h-screen w-48 bg-white text-gray-900 shadow-lg overflow-y-auto z-50">
     <EduSynxLogo className="ml-8 text-[1rem]" />
      <nav className="mt-6">
        <ul>
          {navItems.map(({ name, icon: Icon, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`flex items-center px-6 py-3 hover:bg-teal-200 transition ${
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
