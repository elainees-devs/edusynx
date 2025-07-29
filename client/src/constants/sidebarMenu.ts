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
  FaStream,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { studentNavChildren, teacherNavChildren } from "./sidebar-submenu";

export interface NavItem {
  name: string;
  path: string;
  icon: IconType;
  children?: NavItem[];
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
  {
    name: "Teachers",
    icon: FaChalkboardTeacher,
    path: "/dashboard/teachers",
    children: teacherNavChildren,
  },
  { name: "Students", icon: FaUsers, path: "/dashboard/students" },
  { name: "Streams", icon: FaStream, path: "/dashboard/streams" },
  { name: "Classes", icon: FaBook, path: "/head-teacher/class/new" },
  { name: "Reports", icon: FaClipboardList, path: "/dashboard/reports" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];

export const schoolAdminNavItems: NavItem[] = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },
  { name: "Students", icon: FaSchool, path: "/dashboard/students",  children: studentNavChildren, },
  { name: "Reports", icon: FaUser, path: "/dashboard/reports" },
  { name: "Settings", icon: FaCog, path: "/dashboard/settings" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];
