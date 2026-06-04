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
  FaUserTie,
  FaBuilding,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  classNavChildren,
  teacherNavChildren,
  subjectNavChildren,
  studentNavChildren,
  streamNavChildren,
  attendanceNavChildren,
  competencyNavChildren,
  strandNavChildren,
  academicYearNavChildren,
  enrollmentNavChildren,
  staffNavChildren,
  departmentNavChildren,
  classTeacherNavChildren,
} from "./SidebarSubmenu";

export interface NavItem {
  name: string;
  path: string;
  icon: IconType;
  children?: NavItem[];
}

export const superAdminNavItems: NavItem[] = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/super-admin/dashboard" },
  { name: "Schools", icon: FaSchool, path: "/super-admin/schools" },
  { name: "Users", icon: FaUser, path: "/super-admin/users" },
  { name: "Settings", icon: FaCog, path: "/super-admin/settings" },
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
    name: "Staff",
    icon: FaUserTie,
    path: "/dashboard/staff",
    children: staffNavChildren,
  },
  { 
    name: "Students", icon: FaUserGraduate, 
    path: "/:slug/dashboard/students/view" ,
    children: studentNavChildren(":slug"),
  },
  { 
    name: "Streams", 
    icon: FaStream, 
    path: "/dashboard/streams",
    children: streamNavChildren,
  },
  {
    name: "Class",
    icon: FaBook,
    path: "/dashboard/classes",
    children: classNavChildren(":slug"),
  },
  {
    name: "Subjects",
    icon: FaBook,
    path: "/dashboard/subjects",
    children: subjectNavChildren,
  },
  {
    name: "Competencies",
    icon: FaBook,
    path: "/dashboard/competency",
    children: competencyNavChildren,
  },
  {
    name: "Strands",
    icon: FaBook,
    path: "/dashboard/strands",
    children: strandNavChildren,
  },
  {
    name: "Attendance",
    icon: FaClipboardList,  
    path: "/dashboard/attendance",
    children: attendanceNavChildren(":slug"),
  },
  {
    name: "Academic Years",
    icon: FaBook,
    path: "/academic-years",
    children: academicYearNavChildren,
  },
  {
    name: "Enrollments",
    icon: FaClipboardList,
    path: "/enrollments",
    children: enrollmentNavChildren,
  },
  {
    name: "Departments",
    icon: FaBuilding,
    path: "/dashboard/departments",
    children: departmentNavChildren,
  },
  { name: "Reports", icon: FaClipboardList, path: "/dashboard/reports" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];

export const schoolAdminNavItems: NavItem[] = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/:slug/dashboard/school-admin" },
  {
    name: "Students",
    icon: FaSchool,
    path: "/:slug/dashboard/students/view",
    children: studentNavChildren(":slug"),
  },
  {
    name: "Class",
    icon: FaBook,
    path: "#",
    children: classNavChildren(":slug"),
  },

  { name: "Reports", icon: FaUser, path: "/dashboard/reports" },
  { name: "Settings", icon: FaCog, path: "/dashboard/settings" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];

export const teacherNavItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: FaTachometerAlt,
    path: "/:slug/dashboard/teacher",
  },
  {
    name: "Students",
    icon: FaUserGraduate,
    path: "/:slug/dashboard/students/view",
    children: studentNavChildren(":slug"),
  },
  {
    name: "Class",
    icon: FaBook,
    path: "#",
    children: classTeacherNavChildren(":slug"),
  },
  {
    name: "Teachers",
    icon: FaChalkboardTeacher,  
    path: "/dashboard/teachers",
    children: teacherNavChildren,
  },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];

