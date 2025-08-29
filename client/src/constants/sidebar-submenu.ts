// client/src/constants/sidebar-submenu.ts
import {
  FaEye,
  FaTasks,
  FaChartLine,
  FaCalendarCheck,
  FaBookOpen,
  FaEnvelope,
  FaFileAlt,
  FaPlusCircle,
  FaListAlt,
  FaChalkboardTeacher,
  FaPlus,
} from "react-icons/fa";
import type { NavItem } from "./sidebarMenu";

 
// Export the children array using NavItem[] type
export const teacherNavChildren : NavItem[] = [
  {
    name: "View Teachers",
    icon: FaEye,
    path: "/dashboard/principal/teachers/view",
  },
  {
    name: "Assign Subjects/Classes",
    icon: FaTasks,
    path: "/dashboard/teachers/assign",
  },
  {
    name: "Performance Review",
    icon: FaChartLine,
    path: "/dashboard/teachers/performance",
  },
  {
    name: "Attendance Records",
    icon: FaCalendarCheck,
    path: "/dashboard/teachers/attendance",
  },
  {
    name: "Lesson Plans",
    icon: FaBookOpen,
    path: "/dashboard/teachers/lessons",
  },
  { name: "Messages", icon: FaEnvelope, path: "/dashboard/teachers/messages" },
  {
    name: "Teacher Documents",
    icon: FaFileAlt,
    path: "/dashboard/teachers/documents",
  },
];

export const studentNavChildren = (slug: string): NavItem[] => [
  {
    name: "Add Student",
    icon: FaPlus,
    path: `/${slug}/student/new`,
  },
  {
    name: "View Active Students",
    icon: FaEye,
    path: `/${slug}/active/students`,
  },
  {
    name: "View Other Students",
    icon: FaEye,
    path: `/${slug}/students`,
  },
  {
    name: "Add Guardian",
    icon: FaPlus,
    path: "/dashboard/school-admin/guardians/new",
  },
  {
    name: "View Guardian",
    icon: FaEye,
    path: "/dashboard/school-admin/guardians/view",
  },
];

// Export the children array using NavItem[] type
export const classNavChildren : NavItem[] = [
  {
    name: "Add Class",
    icon: FaPlusCircle,   
    path: "/dashboard/class/new",
  },
  {
    name: "View Registered Classes",
    icon: FaListAlt,      
    path: "/dashboard/class/view",
  },
  {
    name: "Class Overview",
    icon: FaChalkboardTeacher,
    path: "/dashboard/class-overview",
  }
]


