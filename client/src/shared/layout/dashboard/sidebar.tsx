import { Link, useLocation, useParams } from "react-router-dom";
import {
  headTeacherNavItems,
  schoolAdminNavItems,
  superAdminNavItems,
  type NavItem,
} from "../../../constants/sidebarMenu";
import { studentNavChildren } from "../../../constants/sidebar-submenu";
import EduSynxLogo from "../../edusynx-logo";

interface SidebarProps {
  role: string | string[];
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const { slug = "" } = useParams<{ slug: string }>();
  
  const normalizedRole = Array.isArray(role)
    ? role[0].toLowerCase().replace(/\s+/g, "-") 
    : role.toLowerCase().replace(/\s+/g, "-");

  const navMap: Record<string, () => NavItem[]> = {
    "super-admin": () => superAdminNavItems,
    "headteacher": () => headTeacherNavItems,
    "school-admin": () =>
      schoolAdminNavItems.map((item) =>
        item.name === "Students"
          ? { ...item, children: studentNavChildren(slug) }
          : item
      ),
  };

  const navItems = navMap[normalizedRole]?.() || [];

  // Function to replace :slug in paths
  const resolvePath = (path: string) =>
    path.includes(":slug") ? path.replace(":slug", slug) : path;

  return (
    <aside className="fixed top-0 left-0 h-screen w-48 bg-white text-gray-900 shadow-lg overflow-visible z-50">
      <EduSynxLogo className="ml-8 text-[1rem]" />
      <nav className="mt-6">
        <ul>
          {navItems.map(({ name, icon: Icon, path, children }) => (
            <li key={name} className="group relative">
              <Link
                to={path ? resolvePath(path) : "#"}
                className={`flex items-center px-6 py-3 hover:bg-teal-200 transition ${
                  location.pathname === resolvePath(path)
                    ? "bg-gray-700 text-white"
                    : ""
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
                          to={childPath ? resolvePath(childPath) : "#"}
                          className={`flex items-center px-4 py-2 hover:bg-teal-100 transition ${
                            location.pathname === resolvePath(childPath)
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
