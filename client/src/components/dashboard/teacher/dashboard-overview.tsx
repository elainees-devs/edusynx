// client/src/components/dashboard/teacher/TeacherDashboardOverview.tsx
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
const chartColors = ["#319795", "#008eab", "#3280b7", "#6c6daf"];

// Dummy Data
const kpi = {
  classesAssigned: 5,
  studentsTotal: 210,
  lessonsToday: 4,
  tasksPending: 12,
};

const attendanceTrend = [
  { day: "Mon", rate: 92 },
  { day: "Tue", rate: 90 },
  { day: "Wed", rate: 95 },
  { day: "Thu", rate: 88 },
  { day: "Fri", rate: 93 },
];

const performanceData = [
  { subject: "Math", avg: 78 },
  { subject: "English", avg: 72 },
  { subject: "Science", avg: 81 },
  { subject: "History", avg: 75 },
  { subject: "Geography", avg: 70 },
];

const workloadData = [
  { name: "Completed", value: 65 },
  { name: "Pending", value: 25 },
  { name: "Overdue", value: 10 },
];

const upcomingLessons = [
  { id: 1, title: "Mathematics – Algebra", time: "10:00 AM" },
  { id: 2, title: "Science – Energy", time: "12:00 PM" },
  { id: 3, title: "English – Poetry", time: "2:00 PM" },
];

const TeacherDashboardOverview: React.FC = () => {
  return (
    <div className="ml-48 p-6 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
      <p className="text-gray-600">Overview of your classes, attendance, tasks & performance</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Classes Assigned</p>
          <p className="text-3xl font-bold text-teal-700">{kpi.classesAssigned}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Students</p>
          <p className="text-3xl font-bold text-blue-600">{kpi.studentsTotal}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Lessons Today</p>
          <p className="text-3xl font-bold text-purple-600">{kpi.lessonsToday}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Pending Tasks</p>
          <p className="text-3xl font-bold text-red-500">{kpi.tasksPending}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke={chartColors[0]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Bar Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Class Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg" fill={chartColors[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Workload Pie Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Task Workload</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={workloadData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
                label
              >
                {workloadData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Lessons */}
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-bold mb-4">Upcoming Lessons</h3>
        <ul className="space-y-3">
          {upcomingLessons.map((lesson) => (
            <li
              key={lesson.id}
              className="border-b pb-2 flex justify-between text-gray-700"
            >
              <span>{lesson.title}</span>
              <span className="font-semibold">{lesson.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboardOverview;
