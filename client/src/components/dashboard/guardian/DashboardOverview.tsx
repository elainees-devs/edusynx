import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Color Palette
const chartColors = ["#0F766E", "#14B8A6", "#F59E0B", "#2563EB"];

// Dummy Data
const kpi = {
  attendance: "92%",
  latestExam: "88%",
  upcomingEvent: "Parent Meeting - Fri",
  pendingFees: 120,
};

const performanceTrend = [
  { exam: "Term 1", score: 80 },
  { exam: "Term 2", score: 85 },
  { exam: "Term 3", score: 88 },
  { exam: "Term 4", score: 90 },
];

const subjectPerformance = [
  { subject: "Math", avg: 78 },
  { subject: "English", avg: 72 },
  { subject: "Science", avg: 81 },
  { subject: "History", avg: 75 },
  { subject: "Geography", avg: 70 },
];

const feesData = [
  { name: "Paid", value: 70 },
  { name: "Pending", value: 30 },
];

const announcements = [
  "School closed next Monday.",
  "Sports day next week!",
];

const messages = [
  "Math teacher: Homework due tomorrow.",
  "Science teacher: Project update needed.",
];

const GuardianDashboardOverview: React.FC = () => {
  return (
    <div className="ml-48 p-6 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold text-gray-800">Guardian Dashboard</h1>
      <p className="text-gray-600">Overview of your child's performance, attendance & school updates</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Attendance</p>
          <p className="text-3xl font-bold text-teal-700">{kpi.attendance}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Latest Exam Score</p>
          <p className="text-3xl font-bold text-blue-600">{kpi.latestExam}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Upcoming Event</p>
          <p className="text-lg font-semibold">{kpi.upcomingEvent}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Pending Fees</p>
          <p className="text-3xl font-bold text-red-500">${kpi.pendingFees}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Performance Trend */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exam" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke={chartColors[0]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg" fill={chartColors[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fees Status Pie */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Fees Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={feesData} dataKey="value" nameKey="name" outerRadius={70} label>
                {feesData.map((item, index) => (
                  <Cell key={index} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Announcements & Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-4">Announcements</h3>
          <ul className="space-y-3">
            {announcements.map((note, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-xl text-gray-700">{note}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-4">Messages from Teachers</h3>
          <ul className="space-y-3">
            {messages.map((msg, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-xl text-gray-700">{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboardOverview;