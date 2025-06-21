// src/constants/sidebar-menu.ts
export interface MenuItem {
  label: string;
  path: string;
}

export const roleMenus: Record<string, MenuItem[]> = {
  admin: [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Users", path: "/dashboard/users" },
    { label: "Reports", path: "/dashboard/reports" },
    { label: "Classes", path: "/dashboard/classes" },
    { label: "Teachers", path: "/dashboard/teachers" },
    { label: "Performance", path: "/dashboard/performance" },
    { label: "Attendance", path: "/dashboard/attendance" },
    { label: "Child's Performance", path: "/dashboard/performance" },
    { label: "Fees", path: "/dashboard/fees" },
    { label: "Children", path: "/dashboard/children" },
    { label: "Messages", path: "/dashboard/messages" },
  ],
  "school-admin": [
    { label: "Dashboard", path: "/dashboard/school-admin" },
    { label: "Classes", path: "/dashboard/classes" },
    { label: "Teachers", path: "/dashboard/teachers" },
  ],
  headteacher: [
    { label: "Dashboard", path: "/dashboard/headteacher" },
    { label: "Performance", path: "/dashboard/performance" },
  ],
  teacher: [
    { label: "My Classes", path: "/dashboard/classes/teacher" },
    { label: "Attendance", path: "/dashboard/attendance" },
  ],
  guardian: [
    { label: "Child's Performance", path: "/dashboard/performance" },
    { label: "Fees", path: "/dashboard/fees" },
    { label: "Children", path: "/dashboard/children" },
    { label: "Messages", path: "/dashboard/messages" },
  ],
  accountant: [
    { label: "Dashboard", path: "/dashboard/accountant" },
    { label: "Fee Management", path: "/dashboard/fees" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Reports", path: "/dashboard/reports" },
  ],
};
