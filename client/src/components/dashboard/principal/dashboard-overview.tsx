// client/src/components/PrincipalDashboardOverview.tsx
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
} from "recharts";

// Color palette
const chartColors = ["#319795", "#008eab", "#3280b7", "#6c6daf"];

// Dummy Data
const kpiData = {
  students: 1250,
  teachers: 58,
  classes: 24,
  pendingFees: 7230,
};

const attendanceData = [
  { month: "Jan", rate: 80 },
  { month: "Feb", rate: 85 },
  { month: "Mar", rate: 83 },
  { month: "Apr", rate: 86 },
  { month: "May", rate: 88 },
  { month: "Jun", rate: 92 },
];

const examData = [
  { grade: "A", students: 85 },
  { grade: "B", students: 60 },
  { grade: "C", students: 45 },
  { grade: "D", students: 20 },
];

const feeData = [
  { name: "Paid", value: 60 },
  { name: "Due", value: 25 },
  { name: "Overdue", value: 5 },
  { name: "Other", value: 10 },
];

const recentActivity = [
  { id: 1, text: "New student: Emma Watson enrolled." },
  { id: 2, text: "Mr. Smith marked absent today." },
  { id: 3, text: "Science Fair scheduled for May 20th." },
  { id: 4, text: "Fee reminder sent to 5 parents." },
];

const quickActions = [
  { id: 1, label: "Add Student", color: chartColors[0] },
  { id: 2, label: "Add Teacher", color: chartColors[1] },
  { id: 3, label: "Create Exam", color: chartColors[2] },
  { id: 4, label: "Send Notification", color: chartColors[3] },
];

// KPI Card Component
const KPICard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
  <div className="bg-white rounded shadow p-4 flex-1 text-center">
    <p className="text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const PrincipalDashboardOverview: React.FC = () => {
  return (
    <div className="ml-48 p-6 space-y-6 overflow-auto">
      {/* KPI Cards */}
      <div className="flex gap-6 mb-6 flex-wrap">
        <KPICard title="Total Students" value={kpiData.students} />
        <KPICard title="Total Teachers" value={kpiData.teachers} />
        <KPICard title="Classes & Streams" value={kpiData.classes} />
        <KPICard title="Pending Fees" value={kpiData.pendingFees} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Attendance Line Chart */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-bold mb-2">Attendance Rate</h3>
          <LineChart width={300} height={200} data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke={chartColors[0]} strokeWidth={2} />
          </LineChart>
        </div>

        {/* Fee Pie Chart */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-bold mb-2">Fee Collection</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={feeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {feeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        {/* Exam Bar Chart */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-bold mb-2">Exam Performance</h3>
          <BarChart width={300} height={200} data={examData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill={chartColors[1]} />
          </BarChart>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded shadow p-4">
          <h3 className="font-bold mb-2">Recent Activity</h3>
          <ul className="space-y-2">
            {recentActivity.map(a => (
              <li key={a.id} className="border-b border-gray-200 pb-2">{a.text}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-bold mb-2">Quick Actions</h3>
          <div className="flex flex-col space-y-2">
            {quickActions.map(a => (
              <button
                key={a.id}
                style={{ backgroundColor: a.color }}
                className="text-white py-2 px-4 rounded hover:opacity-90"
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrincipalDashboardOverview;
