// client/src/constants/sidebarMenu.ts

import {
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaSchool,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import type { IconType } from "react-icons"; 

interface NavItem {
  name: string;
  path: string;
  icon: IconType;
}

export const superAdminNavItems: NavItem[] = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },
  { name: "Schools", icon: FaSchool, path: "/dashboard/schools" },
  { name: "Users", icon: FaUser, path: "/dashboard/users" },
  { name: "Settings", icon: FaCog, path: "/dashboard/settings" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];

export const headTeacherNavItems: NavItem[] = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },
  { name: "Teachers", icon: FaChalkboardTeacher, path: "/dashboard/teachers" },
  { name: "Students", icon: FaUsers, path: "/dashboard/students" },
  { name: "Classes", icon: FaBook, path: "/dashboard/classes" },
  { name: "Reports", icon: FaClipboardList, path: "/dashboard/reports" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];
