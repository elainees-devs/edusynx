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

import AttendanceSummaryWidget from './AttendanceSummaryWidget';
import AtRiskWidget from './AtRiskWidget';

// Color palette
const chartColors = ["#319795", "#008eab", "#3280b7", "#6c6daf"];

// Dummy Data
/* ... */

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
      <header className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">School Admin Dashboard</h1>
          <p className="text-gray-500">Insights on students, attendance, and class trends</p>
        </div>
        <div className="flex gap-4">
           <AttendanceSummaryWidget />
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Total Students" value={kpiData.totalStudents} />
        <KPICard title="Total Teachers" value={kpiData.totalTeachers} />
        <KPICard title="Total Classes" value={kpiData.totalClasses} />
        <KPICard title="Pending Fees" value={kpiData.pendingFees} />
      </section>

      {/* Charts & Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Trends */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <p className="text-gray-500 text-sm mb-4">New vs Transferred Students</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentTrendData}>
              <CartesianGrid stroke="#eee" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new" stroke={chartColors[0]} strokeWidth={2} name="New Students" />
              <Line type="monotone" dataKey="transferred" stroke={chartColors[1]} strokeWidth={2} name="Transferred Students" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          <AtRiskWidget />
          
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm mb-4">Class Attendance Submission</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {attendanceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
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
