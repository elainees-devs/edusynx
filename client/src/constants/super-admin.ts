// client/constants/super-admin.ts
export const COLORS = ["#4f46e5", "#16a34a", "#dc2626"];

export const kpiData = {
  totalSchools: 154,
  activeUsers: { admins: 12, teachers: 130, students: 2100 },
  systemUptime: 99.98,
  errorsToday: 7,
  avgApiResponseTime: 240,
};

export const schoolsGrowthData = [
  { month: "Jan", total: 100 },
  { month: "Feb", total: 110 },
  { month: "Mar", total: 120 },
  { month: "Apr", total: 130 },
  { month: "May", total: 142 },
  { month: "Jun", total: 154 },
];

export const activeUsersByRole = [
  { role: "Admins", count: 12 },
  { role: "Teachers", count: 130 },
  { role: "Students", count: 2100 },
];

export const uptimeData = [
  { date: "Jul 01", uptime: 99.99 },
  { date: "Jul 02", uptime: 99.95 },
  { date: "Jul 03", uptime: 99.96 },
  { date: "Jul 04", uptime: 99.97 },
  { date: "Jul 05", uptime: 99.98 },
  { date: "Jul 06", uptime: 99.99 },
];

export const apiUsageData = [
  { endpoint: "/login", hits: 3200 },
  { endpoint: "/register", hits: 900 },
  { endpoint: "/users", hits: 2800 },
  { endpoint: "/schools", hits: 1200 },
  { endpoint: "/dashboard", hits: 4500 },
];

export const recentErrors = [
  {
    timestamp: "2025-07-08 13:45:12",
    message: "Database connection timeout",
    endpoint: "/users",
    status: 500,
    user: "admin_001",
  },
  {
    timestamp: "2025-07-08 14:12:03",
    message: "Invalid login credentials",
    endpoint: "/login",
    status: 401,
    user: "teacher_22",
  },
];