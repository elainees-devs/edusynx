// client/src/components/dashboard/school-admin/dashboard-overview.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Color palette
const chartColors = ["#319795", "#008eab", "#3280b7", "#6c6daf"];

// Dummy Data
const kpiData = {
  totalStudents: 820,
  totalTeachers: 35,
  totalClasses: 18,
  pendingFees: 12500,
};

const studentTrendData = [
  { month: 'Jan', new: 40, transferred: 5 },
  { month: 'Feb', new: 50, transferred: 10 },
  { month: 'Mar', new: 45, transferred: 7 },
  { month: 'Apr', new: 60, transferred: 12 },
  { month: 'May', new: 70, transferred: 9 },
];

const attendanceData = [
  { name: 'Submitted', value: 16 },
  { name: 'Not Submitted', value: 4 },
];

const recentActivity = [
  { id: 1, text: 'New student: Emma Watson enrolled.' },
  { id: 2, text: 'Teacher submitted attendance.' },
  { id: 3, text: 'Class 5 fee reminder sent.' },
];

const KPICard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <p className="text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

const SchoolAdminDashboardOverview: React.FC = () => {
  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">School Admin Dashboard</h1>
        <p className="text-gray-500">Insights on students, attendance, and class trends</p>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Total Students" value={kpiData.totalStudents} />
        <KPICard title="Total Teachers" value={kpiData.totalTeachers} />
        <KPICard title="Total Classes" value={kpiData.totalClasses} />
        <KPICard title="Pending Fees" value={kpiData.pendingFees} />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Trends */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm mb-2">New vs Transferred Students</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentTrendData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new" stroke={chartColors[0]} strokeWidth={2} name="New Students" />
              <Line type="monotone" dataKey="transferred" stroke={chartColors[1]} strokeWidth={2} name="Transferred Students" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Pie */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm mb-2">Class Attendance Submission</p>
          <PieChart width={250} height={250}>
            <Pie
              data={attendanceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {attendanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm mb-2">Recent Activity</p>
          <ul className="space-y-2">
            {recentActivity.map(a => (
              <li key={a.id} className="border-b border-gray-200 pb-2">{a.text}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SchoolAdminDashboardOverview;
