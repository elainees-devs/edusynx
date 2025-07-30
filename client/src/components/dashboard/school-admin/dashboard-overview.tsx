// client/src/components/dashboard/school-admin/dashboard-overview.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const studentStats = {
  totalStudents: 820,
};

const studentChartData = [
  { month: 'Jan', new: 40, transferred: 5 },
  { month: 'Feb', new: 50, transferred: 10 },
  { month: 'Mar', new: 45, transferred: 7 },
  { month: 'Apr', new: 60, transferred: 12 },
  { month: 'May', new: 70, transferred: 9 },
];

const attendanceData = {
  submitted: 16,
  notSubmitted: 4,
};

const SchoolAdminDashboardOverview: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">School Admin Dashboard</h1>
        <p className="text-gray-500">Insights on students, transfers, and class attendance</p>
      </header>

      {/* Total Students */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 border w-1/2">
          <p className="text-gray-500 text-sm">Total Students</p>
          <p className="text-4xl font-bold text-blue-600">{studentStats.totalStudents}</p>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white shadow rounded-xl p-6 border col-span-2 w-1/2">
          <p className="text-gray-500 text-sm mb-2">Class Attendance Submission</p>
          <div className="flex justify-between items-center">
            <div className="text-green-600 font-semibold">Submitted: {attendanceData.submitted}</div>
            <div className="text-red-500 font-semibold">Not Submitted: {attendanceData.notSubmitted}</div>
          </div>
          <div className="w-3/4 bg-gray-100 h-3 rounded mt-2">
            <div
              className="h-3 bg-green-500 rounded-l"
              style={{ width: `${(attendanceData.submitted / (attendanceData.submitted + attendanceData.notSubmitted)) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Student Trends Chart */}
      <section className="bg-white shadow rounded-xl p-6 border">
        <p className="text-gray-500 text-sm mb-4">New vs Transferred Students</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={studentChartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="new" stroke="#4F46E5" strokeWidth={2} name="New Students" />
            <Line type="monotone" dataKey="transferred" stroke="#EF4444" strokeWidth={2} name="Transferred Students" />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default SchoolAdminDashboardOverview;
