// client/src/constants/sidebar-submenu.ts
import { 
  FaEye, 
  FaTasks, 
  FaChartLine, 
  FaCalendarCheck, 
  FaBookOpen, 
  FaEnvelope, 
  FaFileAlt 
} from "react-icons/fa";
import type { NavItem } from "./sidebarMenu"; 

// Export the children array using NavItem[] type
export const teacherNavChildren: NavItem[] = [
  { name: "View Teachers", icon: FaEye, path: "/dashboard/headteacher/teachers/view" },
  { name: "Assign Subjects/Classes", icon: FaTasks, path: "/dashboard/teachers/assign" },
  { name: "Performance Review", icon: FaChartLine, path: "/dashboard/teachers/performance" },
  { name: "Attendance Records", icon: FaCalendarCheck, path: "/dashboard/teachers/attendance" },
  { name: "Lesson Plans", icon: FaBookOpen, path: "/dashboard/teachers/lessons" },
  { name: "Messages", icon: FaEnvelope, path: "/dashboard/teachers/messages" },
  { name: "Teacher Documents", icon: FaFileAlt, path: "/dashboard/teachers/documents" },
];
