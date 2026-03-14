// client/src/constants/sidebarMenu.ts

import {
  FaTachometerAlt,
  FaUser,
  FaUserGraduate,
  FaCog,
  FaSchool,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaStream,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  classNavChildren,
  teacherNavChildren,
  subjectNavChildren,
  studentNavChildren,
  streamNavChildren,
  attendanceNavChildren
} from "./SidebarSubmenu";

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

export const principalNavItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: FaTachometerAlt,
    path: "/:slug/dashboard/principal",
  },
  {
    name: "Teachers",
    icon: FaChalkboardTeacher,
    path: "/dashboard/teachers",
    children: teacherNavChildren,
  },
  { 
    name: "Students", icon: FaUserGraduate, 
    path: "/:slug/students/view" ,
    children: studentNavChildren(":slug"),
  },
  { 
    name: "Streams", 
    icon: FaStream, 
    path: "/dashboard/streams",
    children: streamNavChildren,
  },
  {
    name: "Classes",
    icon: FaBook,
    path: "/dashboard/classes",
    children: classNavChildren,
  },
  {
    name: "Subjects",
    icon: FaBook,
    path: "/dashboard/subjects",
    children: subjectNavChildren,
  },

  {
    name: "Attendance",
    icon: FaClipboardList,  
    path: "/dashboard/attendance",
    children: attendanceNavChildren,
  },

  { name: "Reports", icon: FaClipboardList, path: "/dashboard/reports" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];

export const schoolAdminNavItems: NavItem[] = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },
  {
    name: "Students",
    icon: FaSchool,
    path: "/dashboard/students",
  },

  { name: "Reports", icon: FaUser, path: "/dashboard/reports" },
  { name: "Settings", icon: FaCog, path: "/dashboard/settings" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];
