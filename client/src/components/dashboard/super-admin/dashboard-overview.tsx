// File: src/components/dashboard/SuperAdminDashboard.tsx

import React from "react";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { activeUsersByRole, apiUsageData, COLORS, kpiData, recentErrors, schoolsGrowthData, uptimeData } from "../../../constants/super-admin";



const KpiCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-white rounded-2xl shadow p-4 w-full">
    <p className="text-sm text-gray-500">{label}</p>
    <h2 className="text-xl font-bold">{value}</h2>
  </div>
);

const SuperAdminDashboardOverView: React.FC = () => {
  return (
    <div className="ml-48 p-6 space-y-6">
      {/* Top KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <KpiCard label="Total Schools" value={kpiData.totalSchools} />
        <KpiCard
          label="Active Users"
          value={`Admins: ${kpiData.activeUsers.admins}, Teachers: ${kpiData.activeUsers.teachers}, Students: ${kpiData.activeUsers.students}`}
        />
        <KpiCard label="System Uptime" value={`${kpiData.systemUptime}%`} />
        <KpiCard label="Errors Today" value={kpiData.errorsToday} />
        <KpiCard label="Avg API Time" value={`${kpiData.avgApiResponseTime}ms`} />
      </div>

      {/* Middle Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="mb-2 font-semibold">Schools Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={schoolsGrowthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#4f46e5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="mb-2 font-semibold">Active Users by Role</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={activeUsersByRole}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                label
              >
                {activeUsersByRole.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="mb-2 font-semibold">Uptime Last 6 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={uptimeData}>
              <XAxis dataKey="date" />
              <YAxis domain={[99.90, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="uptime" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: API Usage & Errors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="mb-2 font-semibold">API Usage by Endpoint</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={apiUsageData}>
              <XAxis dataKey="endpoint" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hits" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow overflow-x-auto">
          <h3 className="mb-2 font-semibold">Recent Errors</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pr-4">Timestamp</th>
                <th className="pr-4">Message</th>
                <th className="pr-4">Endpoint</th>
                <th className="pr-4">Status</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {recentErrors.map((error, index) => (
                <tr key={index} className="border-t">
                  <td className="pr-4 py-1">{error.timestamp}</td>
                  <td className="pr-4 py-1">{error.message}</td>
                  <td className="pr-4 py-1">{error.endpoint}</td>
                  <td className="pr-4 py-1">{error.status}</td>
                  <td className="py-1">{error.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboardOverView;
